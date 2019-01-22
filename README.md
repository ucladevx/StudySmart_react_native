# Gitignore (Important)
Please add `/config.js` and `/ios/GoogleService-Info.plist`, to your .gitignore so that we don't accidentally push our API_KEYs onto Github. Always check with git status that these 2 files are not getting added to your commit. 

Also, before you push, go into SS.xcworkspace and go to SS --> Info --> URL types and replace the URL Scheme with ENTER_API_KEY_HERE


# To run the program in xcode: 

* navigate to react_native
* run the following:

```
$ react-native upgrade
```
```
$ npm install 
```
```
$ react-native link
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

# Hot reloading
* Save your file
* Pres cmd+r to reload javascript

# Worst case to run(if dependencies are messed up)
1. npm install in directory
2. Make React a target dependency in the XCode Project. 
3. For MaterialFonts error, run 'react-native link react-native-vector-icons'

You possibly might have to also do the following : 
Add third-party and RNVectorIcons as target dependencies.
```
$ cd node_modules/react-native/scripts && ./ios-install-third-party.sh && cd ../../../
$ cd node_modules/react-native/third-party/glog-0.3.5/ && ../../scripts/ios-configure-glog.sh 
&& cd ../../../../*
```
 If you're ever pulling again, especially if there's a new dependency or you get an 
 ```
 linker command failed - ld: library not found for -lWHATEVER
 ```
 always run 
 ```
$ npm install 
```
```
$ react-native link
```
### Get the ESLint extension for your code editor. The errors should show up as underlined red in your editor. Always try to remove all of your errors before your push, especially the aesthetic ones. If no lines show up, run
```
$ npm run lint 
```

# Setting Up Google Sign-in

### Grabbing the necessary files

* Login to the Studysmart team drive and go to the 'Important' folder
* Grab the `config.js` file and put it into the project's root directory

### Adding the API_KEY

* Go into `ios` folder and open up `SS.xcworkspace` 
* Drag `GoogleService-Info.plist` file from team drive and put it under 'SS' folder in the XCode Project Navigator
* Click on SS in the XCode Project Navigator 
* Go to 'Info', click on 'URL Types', and in the 'URL Schemes Box' enter in the `REVERSED_CLIENT_ID` from the `GoogleService-Info.plist` file that we grabbed earlier
* Run the following inside the `ios` directory

```bash

# If you don't have cocoa pods installed, run the following command:
$ sudo gem install cocoapods
```
```bash
# Otherwise just this command should work. Make sure you are in the Studysmart_react_native/ios/ directory 
$ pod install    
```
```bash
# If it tells you an error -> "Xcodeproj doesn't know about the following attributes {"inputFileListPaths"=>[], "outputFileListPaths"=>[]} for the 'PBXShellScriptBuildPhase' isa."  Run the following before pod install. 
$ sudo gem update xcodeproj     
```

Now you should be able to run the project on XCode cleanly. Make sure you use SS.xcworkspace from now on instead of SS.xcodeproj because we are using cocoa pods.
