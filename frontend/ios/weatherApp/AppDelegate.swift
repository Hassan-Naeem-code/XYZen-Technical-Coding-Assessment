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
    let urlString = "https://webservices.takechargemobile.app:3000/api/background-location"
    guard let serviceUrl = URL(string: urlString) else { return }
    let parameterDictionary = ["lat": lat, "long": long]
    var request = URLRequest(url: serviceUrl)
    request.httpMethod = "POST"
    request.setValue("Application/json", forHTTPHeaderField: "Content-Type")
    request.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")

    print(parameterDictionary)
    print(token)

    guard let httpBody = try? JSONSerialization.data(withJSONObject: parameterDictionary, options: []) else {
      return
    }
    request.httpBody = httpBody

    let session = URLSession.shared
    session.dataTask(with: request) { (data, response, error) in
      if let response = response {
        print(response)
      }
      if let data = data {
        do {
          let json = try JSONSerialization.jsonObject(with: data, options: [])
          print(json)
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
