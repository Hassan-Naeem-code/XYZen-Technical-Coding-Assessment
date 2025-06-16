import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate, RCTBridgeDelegate {
  func sourceURL(for bridge: RCTBridge) -> URL? {
    nil
  }
  
  var window: UIWindow?
  var bridge: RCTBridge!

  var reactNativeDelegate: ReactNativeDelegate?
  var reactNativeFactory: RCTReactNativeFactory?

  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    let delegate = ReactNativeDelegate()
    let factory = RCTReactNativeFactory(delegate: delegate)
    delegate.dependencyProvider = RCTAppDependencyProvider()

    reactNativeDelegate = delegate
    reactNativeFactory = factory

    self.window = UIWindow(frame: UIScreen.main.bounds)

    // React Native bridge setup
    self.bridge = RCTBridge(delegate: self, launchOptions: launchOptions)
    let rootView = RCTRootView(bridge: self.bridge, moduleName: "weatherApp", initialProperties: nil)

    let rootViewController = UIViewController()
    rootViewController.view = rootView
    self.window!.rootViewController = rootViewController
    self.window!.makeKeyAndVisible()

    factory.startReactNative(
      withModuleName: "weatherApp",
      in: window,
      launchOptions: launchOptions
    )

    // Register for custom notification
    NotificationCenter.default.addObserver(self, selector: #selector(self.methodOfReceivedNotification(notification:)), name: Notification.Name("GetUserToken"), object: nil)

    return true
  }

  func applicationDidEnterBackground(_ application: UIApplication) {}

  func applicationWillEnterForeground(_ application: UIApplication) {
    NotificationCenter.default.removeObserver(self, name: Notification.Name("GetUserToken"), object: nil)
  }

  func applicationDidBecomeActive(_ application: UIApplication) {}

  func applicationWillTerminate(_ application: UIApplication) {
    NotificationCenter.default.removeObserver(self, name: Notification.Name("GetUserToken"), object: nil)
  }

  @objc func methodOfReceivedNotification(notification: Notification) {
    let data = notification.userInfo
    postDataOnServer(token: (data?["token"] as? String ?? ""), lat: (data?["lat"] as? String ?? ""), long: (data?["long"] as? String ?? ""))
  }

  private func postDataOnServer(token: String, lat: String, long: String) {
    let urlString = "http://localhost:4000/api/weather/current?lat=\(lat)&long=\(long)"
    guard let serviceUrl = URL(string: urlString) else { return }
    // let parameterDictionary = ["lat": lat, "long": long]
    var request = URLRequest(url: serviceUrl)
    request.httpMethod = "GET"
    request.setValue("Application/json", forHTTPHeaderField: "Content-Type")

    print(parameterDictionary)

    let session = URLSession.shared
    session.dataTask(with: request) { (data, response, error) in
      if let response = response {
        print(response)
      }
      if let data = data {
        do {
          let json = try JSONSerialization.jsonObject(with: data, options: [])
          print(json)
          if (json.data.windspeed > 40) {
              DispatchQueue.main.async {
                          let center = UNUserNotificationCenter.current()
                          let content = UNMutableNotificationContent()
                          content.title = "High Wind Alert!"
                          content.body = "Wind speed is \(json.data.windspeed) Km/h. Stay safe!"
                          content.sound = .default

                          let trigger = UNTimeIntervalNotificationTrigger(timeInterval: 2, repeats: false)
                          let uuid = UUID().uuidString
                          let request = UNNotificationRequest(identifier: uuid, content: content, trigger: trigger)
                          center.add(request) { error in
                              if let error = error {
                                  print("Notification error: \(error)")
                              }
                          }
                      }
          }
          if (json.data.visibility < 2) {
DispatchQueue.main.async {
            let center = UNUserNotificationCenter.current()
            let content = UNMutableNotificationContent()
            content.title = "Low Visibility Alert!"
            content.body = "Visibility is only \(json.data.visibility) Km. Drive carefully!"
            content.sound = .default

            let trigger = UNTimeIntervalNotificationTrigger(timeInterval: 2, repeats: false)
            let uuid = UUID().uuidString
            let request = UNNotificationRequest(identifier: uuid, content: content, trigger: trigger)
            center.add(request) { error in
                if let error = error {
                    print("Notification error: \(error)")
                }
            }
        }
          }
          if (json.data.temperature >= 40) {
DispatchQueue.main.async {
            let center = UNUserNotificationCenter.current()
            let content = UNMutableNotificationContent()
            content.title = "Extreme Heat Alert!"
            content.body = "Temperature is \(json.data.temperature)}. Stay hydrated!"
            content.sound = .default

            let trigger = UNTimeIntervalNotificationTrigger(timeInterval: 2, repeats: false)
            let uuid = UUID().uuidString
            let request = UNNotificationRequest(identifier: uuid, content: content, trigger: trigger)
            center.add(request) { error in
                if let error = error {
                    print("Notification error: \(error)")
                }
            }
        }
          }
          if (json.data.temperature <= 0) {
DispatchQueue.main.async {
            let center = UNUserNotificationCenter.current()
            let content = UNMutableNotificationContent()
            content.title = "Freezing Temperature Alert!"
            content.body = "Temperature is \(json.data.temperature). Dress warmly!"
            content.sound = .default

            let trigger = UNTimeIntervalNotificationTrigger(timeInterval: 2, repeats: false)
            let uuid = UUID().uuidString
            let request = UNNotificationRequest(identifier: uuid, content: content, trigger: trigger)
            center.add(request) { error in
                if let error = error {
                    print("Notification error: \(error)")
                }
            }
        }
          }
          if (json.data.uvIndex >= 8) {
DispatchQueue.main.async {
            let center = UNUserNotificationCenter.current()
            let content = UNMutableNotificationContent()
            content.title = "High UV Index!"
            content.body = "UV Index is \(json.data.uvIndex). Wear sunscreen and avoid direct sunlight!"
            content.sound = .default

            let trigger = UNTimeIntervalNotificationTrigger(timeInterval: 2, repeats: false)
            let uuid = UUID().uuidString
            let request = UNNotificationRequest(identifier: uuid, content: content, trigger: trigger)
            center.add(request) { error in
                if let error = error {
                    print("Notification error: \(error)")
                }
            }
        }
          }
        } catch {
          print(error)
        }
      }
    }.resume()
  }
}

class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }

  override func bundleURL() -> URL? {
#if DEBUG
    return RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    return Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }
}
