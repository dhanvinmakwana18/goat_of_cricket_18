import pandas as pd
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
import time

def scrape_icc_kohli_data():
    print("Initializing browser and connecting to the ICC website...")
    
    # Setup Chrome to run in the background (headless mode)
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--window-size=1920x1080")
    
    # Initialize the webdriver
    driver = webdriver.Chrome(options=chrome_options)
    
    try:
        # Go exactly to the URL provided
        url = "https://www.icc-cricket.com/rankings/3993/virat-kohli#stats"
        driver.get(url)
        
        # Wait a few seconds to ensure the JavaScript tables fully load
        print("Loading dynamic statistics...")
        time.sleep(5) 
        
        # Grab the fully loaded HTML from the browser
        soup = BeautifulSoup(driver.page_source, 'html.parser')
        
        # Pandas automatically finds all HTML tables
        print("Extracting data tables...")
        tables = pd.read_html(str(soup))
        
        if not tables:
            print("No tables found. The page structure might have blocked the load.")
            return

        # Loop through whatever tables are found (e.g., ODI, U-19 ODI, etc.)
        for i, df in enumerate(tables):
            # Clean up any potential empty rows
            df.dropna(how='all', inplace=True)
            
            # Save to CSV
            filename = f"official_icc_kohli_stats_part_{i+1}.csv"
            df.to_csv(filename, index=False)
            print(f"Success: Saved {len(df)} rows to {filename}")
            
    except Exception as e:
        print(f"An error occurred: {e}")
        
    finally:
        # Always close the automated browser
        driver.quit()
        print("Extraction complete.")

if __name__ == "__main__":
    scrape_icc_kohli_data()
