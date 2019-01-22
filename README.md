# To run the program in xcode: 

* navigate to react_native
* run the following:

```
$ react-native upgrade
```
```
$ npm install 
```
Kill any active metro bundler:
```
$ kill $(lsof -t -i:8081)
```
Reset watchman:
```
$ watchman watch-del-all
```
* double tap on the Xcode project
* build

# Hot relaoding
* Save your file
* Pres cmd+r to reload javascript

# Worst case to run(if dependacnies are messed up)
1. npm install in directory
2. Make React a target dependency in the XCode Project. 
3. For MaterialFonts error, run 'react-native link react-native-vector-icons'

You possibly might have to also do the following : 
Add third-party and RNVectorIcons as target dependencies.
'
cd node_modules/react-native/scripts && ./ios-install-third-party.sh && cd ../../../
$ cd node_modules/react-native/third-party/glog-0.3.5/ && ../../scripts/ios-configure-glog.sh 
&& cd ../../../../*
'

# Setting Up Google Sign-in

#### Grabbing the necessary files

1. Login to the Studysmart team drive and go to the 'Important' folder
2. Grab the `config.js` file and put it into the project's root directory
3. Grab the `GoogleService-Info.plist` file and put it into the `ios/` directory

#### Adding the API_KEY

1. Find the XCode StudySmart project in the `ios/` directory (currently called `SS.xcodeproj`)
2. In the XCode Project Navigator (should be on the left side of your XCode Project), click our current XCode project (SS)
3. A screen should pop up that has different tabs on the top (General, Capabilities, Resource Tags, Info, etc.)
4. Go to 'Info', click on 'URL Types', and in the 'URL Schemes Box' enter in the `REVERSED_CLIENT_ID` from the `GoogleService-Info.plist` file that we grabbed earlier
5. Build & Run XCode project

#### Gitignore
Please add `/config.js` and `/ios/GoogleService-Info.plist`, to your .gitignore so that we don't accidentally push our API_KEYs onto Github
