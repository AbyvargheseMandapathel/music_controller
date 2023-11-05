import requests
from bs4 import BeautifulSoup

# The URL of the web page with the cricket score
url = 'https://www.cricbuzz.com/live-cricket-scores/75581/ind-vs-rsa-37th-match-icc-cricket-world-cup-2023'

# Make a GET request to the URL
response = requests.get(url)

if response.status_code == 200:
    # Parse the HTML content of the page
    soup = BeautifulSoup(response.text, 'html.parser')

    # Find all elements with the specified class name
    class_name = 'cb-col cb-col-100 cb-min-tm cb-text-gray ng-binding'
    elements = soup.find_all('div', class_=class_name)

    # Extract and print the text content of the elements
    for element in elements:
        print(element.get_text())
else:
    print('Failed to retrieve the web page. Status code:', response.status_code)
