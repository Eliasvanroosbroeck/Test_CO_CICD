package ui.view;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;

public class DriverHelper {
    private static WebDriver driver;

    public static WebDriver getDriver(){
        WebDriverManager.firefoxdriver().setup();
        FirefoxDriver driver;
        driver = new FirefoxDriver();
        driver.manage().window().maximize();
        return driver;
    }
}
