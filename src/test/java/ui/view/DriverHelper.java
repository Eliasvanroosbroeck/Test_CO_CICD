package ui.view;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;

public class DriverHelper {
    private static WebDriver driver;

    public static WebDriver getDriver(){
        WebDriverManager.chromedriver().driverVersion("120.0.6099.109").setup();
        ChromeDriver driver;
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        return driver;
    }
}
