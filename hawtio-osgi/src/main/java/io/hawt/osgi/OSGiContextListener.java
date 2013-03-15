package io.hawt.osgi;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.osgi.framework.BundleContext;

public class OSGiContextListener implements ServletContextListener {
    private OSGiTools osgiTools;

    public void contextInitialized(ServletContextEvent servletContextEvent) {
        try {
            /* */
            System.out.println("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
            BundleContext bundleContext = (BundleContext) servletContextEvent.getServletContext().getAttribute("osgi-bundlecontext");
            System.out.println("@@@: " +bundleContext);
            /* */

            osgiTools = new OSGiTools(bundleContext);
            osgiTools.init();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public void contextDestroyed(ServletContextEvent servletContextEvent) {
        try {
            osgiTools.destroy();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
