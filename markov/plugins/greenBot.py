from disco.bot import Bot, Plugin
import random

with open('csvee/trump.csv', 'r') as myfile:
    text = myfile.read().replace('\n', ' ').replace('"', "")
with open('csvee/clinton.csv', 'r') as myfile:
    ctext = myfile.read().replace('\n', ' ').replace('"', "")
words = {}
cwords = {}
spl = text.lower().split(' ')
cspl = ctext.lower().split(' ')

def genDict():
    #TRUMP
    for i in spl:
        words[i] = []

    for i in range(len(spl)):
        if i < len(spl) - 1:
            words[spl[i]].append(spl[i+1])
    #CLINTON
    for i in cspl:
        cwords[i] = []

    for i in range(len(cspl)):
        if i < len(cspl) - 1:
            cwords[cspl[i]].append(cspl[i+1])


def genTrump():
    num = int(random.uniform(5, 25))
    output = random.choice(spl)
    prev = output
    #char = len(output)
    for i in range(1, num):
        #prev = output[i - 1]
        #rStr = words[prev][int(random.uniform(0, len(words[prev])))]
        rStr = random.choice(words[prev])
        prev = rStr
        #print output
        # char += len(rStr) + 1
        # print char
        if len(output) + len(rStr) + 1 > 140:
            break
        output += " " + rStr
    char = len(output)
    return [output, char]

def genClint():
    cnum = int(random.uniform(5, 50))
    coutput = random.choice(cspl)
    cprev = coutput
    #char = len(output)
    for i in range(1, cnum):
        #prev = output[i - 1]
        #rStr = words[prev][int(random.uniform(0, len(words[prev])))]
        crStr = random.choice(cwords[cprev])
        cprev = crStr
        #print output
        # char += len(rStr) + 1
        # print char
        if len(coutput) + len(crStr) + 1 > 140:
            break
        coutput += " " + crStr
    #return ' '.join(output)
    cchar = len(coutput)
    return [coutput, cchar]

genDict()

print "[INFO] Loaded Dictionary"

class DiscordBot(Plugin):
    @Plugin.command('trump')
    def onTrumpCommand(self, event):
        tweet = genTrump()
        event.msg.reply("Generated Trump Tweet (" + str(tweet[1]) + " characters): \n \n" + tweet[0] + '.')
    @Plugin.command('clinton')
    def onClintonCommand(self, event):
        tweet = genClint()
        event.msg.reply("Generated Clinton Tweet (" + str(tweet[1]) + " characters): \n \n" + tweet[0] + '.')
    @Plugin.command('help')
    def onHelpCommand(self, event):
        event.msg.reply("//Trump - Randomly generate a tweet based on 22,345 of Trump's other tweets! \n//Clinton - Randomly generate a tweet based on 4,387 of Clinton's other tweets!")
