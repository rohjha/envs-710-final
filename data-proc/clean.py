import pandas as pd
import csv
from dataclasses import dataclass
import numpy as np
import matplotlib.pyplot as plt

def convert(input):
    if isinstance(input, int):
        return input
    else:
        return 0

bad_rows = list(range(0, 12)) + [29, 30] + list(range(32, 35)) + [54] + list(range(56, 59)) + list(range(60, 72))

# This is just a dictionary of county name to a list of lists
data = {}

for year in range(1965, 2003):
    file_path = "data/" + str(year) + ".csv"
    df = pd.read_csv(file_path, header=None, skiprows=bad_rows, quotechar="\"", thousands=",", nrows=39, usecols=range(0, 12))
    for index, row in df.iterrows():
        county_name = row[0]
        if pd.isna(county_name):
            continue
        if county_name not in data:
            data[county_name] = []

        new_obs = [year]
        for i in range(1, len(row)):
            new_obs.append(convert(row[i]))
        data[county_name].append(new_obs)

j = 0
for county in data:
    county_data = data[county]
    num_years = len(list(range(1965, 2003)))
    years = np.zeros(num_years)
    native_american = np.zeros(num_years)
    forest_industry = np.zeros(num_years)
    private_large = np.zeros(num_years)
    private_small = np.zeros(num_years)
    total_public = np.zeros(num_years)

    for i in range(num_years):
        year_data = county_data[i]
        years[i] = i + 1965
        native_american[i] = year_data[1]
        forest_industry[i] = year_data[2]
        private_large[i] = year_data[3]
        private_small[i] = year_data[4]
        total_public[i] = year_data[10]
    
    ind = np.array(list(range(1965, 2003)))
    width = 0.45

    plt.figure()
    p1 = plt.bar(ind, native_american, width, color="#cc0066")
    p2 = plt.bar(ind, forest_industry, width, bottom=native_american, color="#006600")
    p3 = plt.bar(ind, private_large, width, bottom=native_american+forest_industry, color="#ace600")
    p4 = plt.bar(ind, private_small, width, bottom=native_american+forest_industry+private_large, color="b")
    p5 = plt.bar(ind, total_public, width, bottom=native_american+forest_industry+private_large+private_small, color="#9999ff")

    plt.title(str.lower(county).title())
    plt.legend((p1[0], p2[0], p3[0], p4[0], p5[0]), ('Native American', 'Forest industry', 'Private large', 'Private small', 'Total public'))
    plt.ylabel('Lumber (thousand board feet)', labelpad=15)
    plt.xlabel('Year')

    file_path = "images/" + str.lower(county).replace(' ', '_')
    plt.tight_layout()
    plt.savefig(file_path)