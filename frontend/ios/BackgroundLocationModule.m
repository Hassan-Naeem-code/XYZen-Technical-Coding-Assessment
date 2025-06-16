//
//  BackgroundLocationModule.m
//  weatherApp
//
//  Created by Muhammad Hassan Naeem on 15/06/2025.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(BackgroundLocationModule, NSObject)
RCT_EXTERN_METHOD(fetchDeviceCurrentLiveLocation: (NSString * _Nonnull)token)

@end
