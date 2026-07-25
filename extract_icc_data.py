import pandas as pd
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
import time
import json

def extract_icc_for_ai_studio():
    options = Options()
    options.add_argument("--headless")
    driver = webdriver.Chrome(options=options)
    
    # Virat Kohli's official ICC stats page
    url = "https://www.icc-cricket.com/rankings/3993/virat-kohli#stats"
    driver.get(url)
    time.sleep(5) # Let the tables load
    
    soup = BeautifulSoup(driver.page_source, 'html.parser')
    tables = pd.read_html(str(soup))
    
    # Convert all found tables into a single JSON string for AI Studio
    all_data = {}
    for i, df in enumerate(tables):
        df.dropna(how='all', inplace=True)
        # Using index as a placeholder name (e.g., Table_1_ODI)
        all_data[f"Table_{i+1}"] = df.to_dict(orient="records")
        
    # Save perfectly formatted JSON for Gemini
    with open("kohli_icc_data.json", "w") as f:
        json.dump(all_data, f, indent=4)
        
    print("Data saved to kohli_icc_data.json! Ready for Google AI Studio.")
    driver.quit()

if __name__ == "__main__":
    extract_icc_for_ai_studio()
