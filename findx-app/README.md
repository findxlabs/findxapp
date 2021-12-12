# FindX

FindX is an android application that once installed, runs as an invisible background service that can't be uninstalled by a normal user.If a thief steals the phone, it get's locked with a preset password and if an incorrent password is entered, the app automatically takes the thiefs photo and sends it to your mail, the photo is accompanied with the devices location and a log of all the activities being performed at that specific instance. When in panic mode, if the thief attempts shutting the phone off, the app creates a fake shutdown and activates location and turns on data in the background and with that, the phone can be easily tracked.
Later versions of the app will be able to survive a factory reset.

## Setup/Installation Requirements
* Android 4+ , modern versions require special permisions to work effectively
* Download the app from our official website
* Installation and setup instructions are hardcoded in the application
* once setup is complete, the app runs as a service and can only be managed remotely using your account in our website or via sms
* altenative control instructions are emailed to the users on setup


<h3>
     <a target="blank" href="https://www.paypal.com/donate?hosted_button_id=PJSAAEHCKWV5G">Sponsor the project here -> <img  align="center" alt="Donate" width="60px"
     src="https://ionicabizau.github.io/badges/paypal.svg" /></a>
</h3>

## Installation
You can install a compiled build from <a href="https://github.com/Chal13W1zz/FindX/releases"> here</a>

## Build From Source
Clone this repository and import findx-app into **Android Studio**
```bash
git clone https://github.com/Chal13W1zz/FindX.git
```


## Build variants
Use the Android Studio *Build Variants* button to choose between **production** and **staging** flavors combined with debug and release build types


## Generating signed APK
From Android Studio:
1. ***Build*** menu
2. ***Generate Signed APK...***
3. Fill in the keystore information *(you only need to do this once manually and then let Android Studio remember it)*

## Maintainers
This project is mantained by:
* [Chalie](http://github.com/Chal13W1zz)

## Technologies Used
- Java
- Gradle
- Robolectric
- Espresso
- Junit


## Contributing

1. Fork it to your repo
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -m 'Add some feature')
4. Push your branch (git push origin my-new-feature)
5. Create a new Pull Request


## Bugs
- No Known Bugs
  - If you find a bug, kindly open an issue <a href="https://github.com/Chal13W1zz/FindX/issues/new">Here</a> .
  - If you'd like to request a new feature, feel free to do so by opening an issue <a href="https://github.com/Chal13W1zz/FindX/issues/new">Here</a>.







##
  <p align="center">MIT <a href="https://github.com/Chal13W1zz/FindX/blob/main/LICENSE">Licence</a>
