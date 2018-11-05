# To run the program in xcode: 

* navigate to react_native
* run the following:

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

