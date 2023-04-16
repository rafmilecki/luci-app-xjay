'use strict';
'require view';
'require form';
'require fs';

return view.extend({

    render:function(){
        var m, s, o;
        m = new form.Map('xjay', _('Misc.'), _('Misc. settings for xjay.'));

        s = m.section(form.TypedSection, 'misc', _('Misc Configurations'));
        s.addremove = false;
        s.anonymous = true;

        // as blow are some log options
        s.tab('log', _('Log'));

        o = s.taboption('log', form.ListValue, 'log_level', _('Log Level'), _('Read Xray log in "System Log" or use <code>logread</code> command.'));
        o.value("debug");
        o.value("info");
        o.value("warning");
        o.value("error");
        o.value("none");

        o = s.taboption('log', form.Flag, 'log_access', _('Enable Access Log'), _('Access log will also be written to System Log.'));
        o.enabled = 'true';
        o.disabled = 'false';

        o = s.taboption('log', form.Flag, 'log_error', _('Enable Error Log'), _('Error log will also be written to System Log.'));
        o.enabled = 'true';
        o.disabled = 'false';

        o = s.taboption('log', form.Flag, 'log_dnslog', _('Enable DNS Log'), _('DNS log will also be written to System Log.'));
        o.enabled = 'true';
        o.disabled = 'false';

        // as blow is the debug options
        s.tab('debug', _('Debug'));

        o = s.taboption('debug', form.TextValue, 'xray_conf', _('Xray Config JSON'), _('Check <code>/var/etc/xray/config.json</code> to see if any mistakes there.'));
        o.monospace = true;
        o.readonly = true;
        // set the rows of the text field to be the number of lines of the config file
        fs.lines('/var/etc/xjay/config.json').then(function(value){
            o.rows = value.length;
        });
        // show the config file content
        o.cfgvalue = function(section_id) {
            return fs.trimmed('/var/etc/xjay/config.json');
        };

        return m.render();
    }

});
