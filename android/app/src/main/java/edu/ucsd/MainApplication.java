package edu.ucsd;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.oblador.keychain.KeychainPackage;
import com.github.wumke.RNExitApp.RNExitAppPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.psykar.cookiemanager.CookieManagerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.joshblour.reactnativepermissions.ReactNativePermissionsPackage;
import com.idehub.GoogleAnalyticsBridge.GoogleAnalyticsBridgePackage;
import com.microsoft.codepush.react.CodePush;
import com.ivanwu.googleapiavailabilitybridge.ReactNativeGooglePlayServicesPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new KeychainPackage(),
            new RNExitAppPackage(),
            new RNDeviceInfo(),
            new CookieManagerPackage(),
            new VectorIconsPackage(),
            new ReactNativePermissionsPackage(),
            new GoogleAnalyticsBridgePackage(),
            new CodePush(null, getApplicationContext(), BuildConfig.DEBUG),
            new ReactNativeGooglePlayServicesPackage(),
            new MapsPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
