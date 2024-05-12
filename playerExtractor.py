from bs4 import BeautifulSoup
import requests
import csv
import pandas
import datetime

url = 'https://fifaindex.com/players/fifa23_589/'
response = requests.get(url)
html = BeautifulSoup(response.text,'html')

numPages = int(input("How many pages of players do you want?"))
path = input("Enter the path where the csv should be inserted: ")

#setting up csv file with headers
headers = ['Name','Overall','Nation','Age','Team','Position']
with open(path+r"\fifa23players.csv",'w',newline='') as file:
        writer = csv.writer(file)
        writer.writerow(headers)

for pageNum in range(numPages):
    
    playerNames = [playerNameObj.text.strip() for playerNameObj in html.find_all(class_='link-player')]
    for item in playerNames:
        if item=='':
            playerNames.remove(item)
    
    overallsSections = html.find_all(attrs={"data-title":"OVR / POT"})
    playerOveralls=[]
    for overallsSection in overallsSections:
        playerOveralls.append(overallsSection.find('span').text.strip())
    
    playerNations = []
    for nationObject in html.find_all(class_="link-nation"):
        playerNations.append(nationObject['title'])
    
    playerAges = []
    for ageObj in html.find_all(attrs={'data-title':'Age'}):
        playerAges.append(ageObj.text.strip())
    
    playerClubs = []
    for clubObj in html.find_all(attrs={'class':'link-team'}):
        playerClubs.append(clubObj['title'][:clubObj['title'].find('FIFA 23')].strip())

    playerPositions = []
    for positionObj in html.find_all(attrs={'data-title':'Preferred Positions'}):
        playerPositions.append(positionObj.find("a").text)

    #opening csv file to append player data
    with open(path+r"\fifa23players.csv",'a+',newline='',encoding='UTF8') as file:
        for i in range(len(playerNames)):
            writer = csv.writer(file)
            writer.writerow([playerNames[i],playerOveralls[i],playerNations[i],playerAges[i],playerClubs[i],playerPositions[i]])

    print("Page "+str(pageNum+1)+" is complete.")

    #moving on to the next page
    activePageNum=html.find(class_="page-item active").text.strip()

    url2=html.find(class_='page-link',href='?page='+str(int(activePageNum)+1))
    url='https://fifaindex.com/players/fifa23_589/'+url2['href']

    response = requests.get(url)
    html = BeautifulSoup(response.text,'html')

df = pandas.read_csv(path+r"\fifa23players.csv")
df.set_index("Name")

print("Your dataframe is now ready and can be accessed with variable 'df'.")
print("You can also access your data as a csv in your file explorer.")
