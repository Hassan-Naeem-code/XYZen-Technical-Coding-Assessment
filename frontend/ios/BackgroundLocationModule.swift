import Foundation
import UIKit
import MapKit
import CoreLocation
import UserNotifications

@objc(BackgroundLocationModule)
class BackgroundLocationModule: UIViewController, CLLocationManagerDelegate, UNUserNotificationCenterDelegate {
    var latitude: String = ""
    var longitude: String = ""
    var locationManager = CLLocationManager()
    var authToken: NSString = ""

    override func viewDidLoad() {
        super.viewDidLoad()
        // Set up notification center delegate and request permission once
        let center = UNUserNotificationCenter.current()
        center.delegate = self
        center.requestAuthorization(options: [.badge, .sound, .alert]) { granted, error in
            if let error = error {
                print("Notification permission error: \(error)")
            }
        }
    }

    @objc func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        guard let locValue = manager.location?.coordinate else { return }
        print("LONGITUDE --> \(locValue.longitude)")
        print("LATITUDE --> \(locValue.latitude)")
        latitude = "\(locValue.latitude)"
        longitude = "\(locValue.longitude)"
        NotificationCenter.default.post(name: Notification.Name("GetUserToken"), object: nil, userInfo: ["token": authToken, "lat": latitude, "long": longitude])

        // Send local notification on main thread
        DispatchQueue.main.async {
            let center = UNUserNotificationCenter.current()
            let content = UNMutableNotificationContent()
            content.title = "Location Update"
            content.body = "Latitude: \(self.latitude), Longitude: \(self.longitude)"
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

    @objc func userNotificationCenter(_ center: UNUserNotificationCenter,
                                      willPresent notification: UNNotification,
                                      withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
        completionHandler([.sound, .alert, .badge])
    }
}

// MARK: - LOGIC FUNCTIONS
extension BackgroundLocationModule {
    @objc func fetchDeviceCurrentLiveLocation(_ token: NSString) {
        print(token)
        authToken = token
        self.locationManager.requestAlwaysAuthorization()
        self.locationManager.requestWhenInUseAuthorization()
        self.locationManager.allowsBackgroundLocationUpdates = true

        // DispatchQueue.global().async { [self] in
        //     if CLLocationManager.locationServicesEnabled() {
        //         locationManager.delegate = self
        //         locationManager.desiredAccuracy = kCLLocationAccuracyBest
        //         locationManager.startUpdatingLocation()
        //     }
        // }
        DispatchQueue.main.async { [self] in
          if CLLocationManager.locationServicesEnabled() {
              locationManager.delegate = self
              locationManager.desiredAccuracy = kCLLocationAccuracyBest
              locationManager.allowsBackgroundLocationUpdates = true
              locationManager.pausesLocationUpdatesAutomatically = false
              locationManager.startUpdatingLocation()
              locationManager.startMonitoringSignificantLocationChanges()
          }
        }
    }
}