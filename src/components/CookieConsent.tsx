import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const hasConsent = localStorage.getItem('cookieConsent');
    if (!hasConsent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);

      const autoHideTimer = setTimeout(() => {
        handleAcceptAll();
      }, 15000);

      return () => {
        clearTimeout(timer);
        clearTimeout(autoHideTimer);
      };
    }
  }, []);

  const handleAcceptAll = () => {
    const allPreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allPreferences);
    localStorage.setItem('cookieConsent', JSON.stringify(allPreferences));
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 p-6 border-t">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-2">Cookie Settings</h2>
            <p className="text-gray-600 mb-4">
              We use cookies to enhance your browsing experience and analyze our traffic.
            </p>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {showPreferences ? (
          <div className="space-y-4 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Necessary Cookies</h3>
                <p className="text-sm text-gray-500">Required for the website to function</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.necessary}
                disabled
                className="h-4 w-4 text-blue-600"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Analytics Cookies</h3>
                <p className="text-sm text-gray-500">Help us improve our website</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={(e) =>
                  setPreferences({ ...preferences, analytics: e.target.checked })
                }
                className="h-4 w-4 text-blue-600"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Marketing Cookies</h3>
                <p className="text-sm text-gray-500">Used for targeted advertising</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.marketing}
                onChange={(e) =>
                  setPreferences({ ...preferences, marketing: e.target.checked })
                }
                className="h-4 w-4 text-blue-600"
              />
            </div>
          </div>
        ) : null}

        <div className="flex gap-4 justify-end">
          <button
            onClick={() => setShowPreferences(!showPreferences)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            {showPreferences ? 'Hide Preferences' : 'Show Preferences'}
          </button>
          {showPreferences ? (
            <button
              onClick={handleSavePreferences}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Save Preferences
            </button>
          ) : (
            <button
              onClick={handleAcceptAll}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Accept All
            </button>
          )}
        </div>
      </div>
    </div>
  );
}