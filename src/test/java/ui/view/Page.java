package ui.view;

import org.openqa.selenium.WebDriver;

public abstract class Page {

    WebDriver driver;
    String path = Config.BASE_URL;

    public Page (WebDriver driver) {
        this.driver = driver;
    }

    public String getPath() {
        return path;
    }

    public String getTitle () {
        return driver.getTitle();
    }

}
