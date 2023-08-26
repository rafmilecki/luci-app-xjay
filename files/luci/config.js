'use strict';
'require view';
'require fs';
'require ui';

return view.extend({
	load: function() {
		return Promise.all([
			L.resolveDefault(fs.stat('/var/etc/xjay/config.json'), null)
		]).then(function(stat) {
			var conf = stat[0] ? stat[0].path : null;

			if (conf == null)
				return 'The config file does not exist!';

			return fs.exec_direct('/bin/cat', [ conf ]).catch(function(err) {
				ui.addNotification(null, E('p', {}, _('Unable to load config file: ' + err.message)));
				return '';
			});
		});
	},

	render: function(conf_data) {
		var conf_lines = conf_data.trim().split(/\n/);

		return E([], [
			E('h2', {}, [ _('Xray Config File') ]),
			E('div', { 'id': 'content_config' }, [
				E('textarea', {
					'id': 'xray_config',
					'style': 'font-size:14px',
					'readonly': 'readonly',
					'wrap': 'off',
					'rows': conf_lines.length + 1
				}, [ conf_lines.join('\n') ])
			])
		]);
	},

	handleSaveApply: null,
	handleSave: null,
	handleReset: null
});