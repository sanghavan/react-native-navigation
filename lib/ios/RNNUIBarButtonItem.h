#import "RNNReactComponentRegistry.h"
#import <Foundation/Foundation.h>
#import <React/RCTRootView.h>
#import <React/RCTRootViewDelegate.h>

@interface RNNUIBarButtonItem : UIBarButtonItem <RCTRootViewDelegate>

@property(nonatomic, strong) NSString *buttonId;

- (instancetype)init:(NSString *)buttonId
                icon:(UIImage *)iconImage
                size:(CGSize)size
     backgroundColor:(UIColor *)backgroundColor
        cornerRadius:(CGFloat)cornerRadius
              insets:(UIEdgeInsets)edgeInsets;
- (instancetype)init:(NSString *)buttonId icon:(UIImage *)iconImage;
- (instancetype)init:(NSString *)buttonId withTitle:(NSString *)title;
- (instancetype)init:(NSString *)buttonId withCustomView:(RCTRootView *)reactView;
- (instancetype)init:(NSString *)buttonId withSystemItem:(NSString *)systemItemName;

- (void)notifyDidAppear;
- (void)notifyDidDisappear;

@end
