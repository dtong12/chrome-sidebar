'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.attachHeadersListener = attachHeadersListener;
function attachHeadersListener(_ref) {
  var webRequest = _ref.webRequest,
      hosts = _ref.hosts,
      iframeHosts = _ref.iframeHosts,
      overrideFrameOptions = _ref.overrideFrameOptions;

  if (typeof hosts !== 'string') {
    if (hosts) {
      hosts = hosts.join(' ');
    } else {
      throw new Error('`hosts` option must be a string or array');
    }
  }

  if (typeof iframeHosts !== 'string') {
    if (iframeHosts) {
      iframeHosts = iframeHosts.join(' ');
    } else {
      throw new Error('`iframeHosts` option must be a string or array');
    }
  }

  var types = ['main_frame'];

  if (overrideFrameOptions) {
    types.push('sub_frame');
  }

  webRequest.onHeadersReceived.addListener(function (details) {
    var responseHeaders = details.responseHeaders.map(function (header) {
      var isCSPHeader = /content-security-policy/i.test(header.name);
      var isFrameHeader = /x-frame-options/i.test(header.name);

      if (isCSPHeader) {
        var csp = header.value;

        csp = csp.replace('script-src', 'script-src ' + hosts);
        csp = csp.replace('style-src', 'style-src ' + hosts);
        csp = csp.replace('frame-src', 'frame-src ' + iframeHosts);
        csp = csp.replace('child-src', 'child-src ' + hosts);

        if (overrideFrameOptions) {
          csp = csp.replace(/frame-ancestors (.*?);/ig, '');
        }

        header.value = csp;
      } else if (isFrameHeader && overrideFrameOptions) {
        header.value = 'ALLOWALL';
      }

      return header;
    });

    return { responseHeaders: responseHeaders };
  }, {
    urls: ['http://*/*', 'https://*/*'],
    types: types
  }, ['blocking', 'responseHeaders']);
}

exports.default = {
  attachHeadersListener: attachHeadersListener
};