import csv
fields = ["text"]

with open("tinytrumpcsv.csv") as infile, open("tinytrump.csv", "wb") as outfile:
    r = csv.DictReader(infile)
    w = csv.DictWriter(outfile, fields, extrasaction="ignore")
    w.writeheader()
    for row in r:
        if not '@realDonaldTrump' in row["text"]:
            w.writerow(row)
