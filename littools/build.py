import os
import sys

def buildApp():
    os.system("npm run build")
    # os.system("npm run postBuild")
    print("Building process done!")
    
def runApp():
    os.system("npm run start")
    
def printHelp():
    print("Full Process (Build and run): No any parameters")
    print("Build Only                  : build")
    print("Run Only                    : run")

if __name__ == "__main__":
    
    if len(sys.argv) <= 1:
        buildApp()
        runApp()
    elif sys.argv[1] == "build":
        buildApp()
    elif sys.argv[1] == "run":
        runApp()
    elif sys.argv[1] == "help":
        printHelp()
    else:
        print("Unknown arguments! Please follow the tips below: ")
        printHelp()
