package io.hawt.osgi.jmx;

import java.lang.management.ManagementFactory;
import javax.management.MBeanServer;
import javax.management.ObjectName;
import org.osgi.framework.BundleContext;

public class ConfigAdmin implements ConfigAdminMXBean {
    private final BundleContext bundleContext;
    private ObjectName objectName;
    private MBeanServer mBeanServer;

    ConfigAdmin(BundleContext bc) {
        bundleContext = bc;
    }

    void init() throws Exception {
        if (objectName == null) {
            objectName = new ObjectName("io.hawt.osgi:type=ConfigAdmin");
        }
        if (mBeanServer == null) {
            mBeanServer = ManagementFactory.getPlatformMBeanServer();
        }
        mBeanServer.registerMBean(this, objectName);
    }

    void destroy() throws Exception {
        if (objectName != null && mBeanServer != null) {
            mBeanServer.unregisterMBean(objectName);
        }
    }

    @Override
    public void configAdminUpdate(String pid, String data) {
        System.out.println("*** PID:" + pid + "\nData: " + data);
    }
}
