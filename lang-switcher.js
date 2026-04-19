/**
 * Language Switcher for 图解 AI Agent
 * Simplified: Chinese ↔ English only.
 * Chinese pages show "EN" button, English pages show "中文" button.
 */
(function () {
  'use strict';

  // Detect if current page is English
  function isEnglish() {
    var path = window.location.pathname;
    return path.indexOf('/en/') !== -1 || path.endsWith('/en') || path.endsWith('/en/');
  }

  // Get current page filename
  function getCurrentPage() {
    var path = window.location.pathname;
    var parts = path.split('/');
    var filename = parts[parts.length - 1] || 'index.html';
    if (filename === '' || filename === 'en') filename = 'index.html';
    return filename;
  }

  // Build target URL
  function buildTargetUrl() {
    var page = getCurrentPage();
    if (isEnglish()) {
      // English -> Chinese: go to root
      // From /en/chapter01.html -> /chapter01.html
      // From /en/index.html -> /index.html
      return '../' + page;
    } else {
      // Chinese -> English: go to en/
      // From /chapter01.html -> /en/chapter01.html
      // From /index.html -> /en/index.html
      return 'en/' + page;
    }
  }

  function createSwitcher() {
    var en = isEnglish();
    var label = en ? '中文' : 'EN';
    var ariaLabel = en ? 'Switch to Chinese' : 'Switch to English';

    var btn = document.createElement('a');
    btn.className = 'lang-switch-btn';
    btn.href = buildTargetUrl();
    btn.textContent = label;
    btn.setAttribute('aria-label', ariaLabel);
    btn.setAttribute('rel', 'alternate');
    btn.setAttribute('hreflang', en ? 'zh-CN' : 'en');

    document.body.appendChild(btn);
  }

  function injectStyles() {
    var css =
      '.lang-switch-btn {' +
      '  position: fixed;' +
      '  top: 14px;' +
      '  right: 18px;' +
      '  z-index: 10000;' +
      '  display: inline-flex;' +
      '  align-items: center;' +
      '  justify-content: center;' +
      '  min-width: 48px;' +
      '  padding: 7px 18px;' +
      '  background: rgba(255, 255, 255, 0.95);' +
      '  border: 1px solid #d1d5db;' +
      '  border-radius: 20px;' +
      '  color: #374151;' +
      '  font-size: 14px;' +
      '  font-weight: 600;' +
      '  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;' +
      '  text-decoration: none;' +
      '  cursor: pointer;' +
      '  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);' +
      '  transition: all 0.2s ease;' +
      '  white-space: nowrap;' +
      '}' +
      '.lang-switch-btn:hover {' +
      '  background: #4f46e5;' +
      '  color: #fff;' +
      '  border-color: #4f46e5;' +
      '  box-shadow: 0 4px 14px rgba(79, 70, 229, 0.35);' +
      '  text-decoration: none;' +
      '  transform: translateY(-1px);' +
      '}' +
      '@media (max-width: 640px) {' +
      '  .lang-switch-btn {' +
      '    top: 10px;' +
      '    right: 12px;' +
      '    padding: 5px 14px;' +
      '    font-size: 13px;' +
      '    min-width: 40px;' +
      '  }' +
      '}';

    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      injectStyles();
      createSwitcher();
    });
  } else {
    injectStyles();
    createSwitcher();
  }
})();
