package ted.restapi.beans;

import javax.ejb.*;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.Date;

@ApplicationScoped
@Singleton
@LocalBean
@Startup
public class ApplicationBean {

    @Schedule(hour = "*", minute = "*/1", persistent = false)
    private void info(){
        System.out.println("------------------------------------------------");
        System.out.println("API is running: " + new Date());
        System.out.println("------------------------------------------------");
    }

    @Inject private UserBean userBean;

    @Schedule(hour = "*", minute = "*", second = "*/30", persistent = false)
    private void updateDB(){
        userBean.updateDB();
    }



}
