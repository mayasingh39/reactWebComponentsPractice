import React, { useState } from 'react';
import { SmartTextarea } from './components/SmartTextarea';
import { Dropdown } from './components/Dropdown';
import { AutosuggestInput } from './components/AutosuggestInput';
import { CookieConsent } from './components/CookieConsent';
import { ProgressBar } from './components/ProgressBar';
import { ScrollFix } from './components/ScrollFix';
import { PasswordInput } from './components/PasswordInput';

const dropdownOptions = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'next', label: 'Next.js' },
];

function App() {
  const [progressValue, setProgressValue] = useState(60);

  return (
    <div className="min-h-screen bg-gray-50">
      <ProgressBar variant="scroll" />
      
      <div className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-12">React Components Showcase</h1>
        
        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-semibold mb-6">Smart Textarea</h2>
            <SmartTextarea />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Dropdown</h2>
            <div className="space-y-4">
              <Dropdown options={dropdownOptions} placeholder="Select framework" />
              <Dropdown
                options={dropdownOptions}
                multiSelect
                placeholder="Select multiple frameworks"
              />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Autosuggest Input</h2>
            <AutosuggestInput />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Progress Bars</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium mb-4">Linear Progress</h3>
                <ProgressBar value={progressValue} />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-4">Circular Progress</h3>
                <ProgressBar value={progressValue} variant="circular" />
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={progressValue}
                onChange={(e) => setProgressValue(Number(e.target.value))}
                className="w-full max-w-xs"
              />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Password Input</h2>
            <PasswordInput />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Scroll Fix Demo</h2>
            <ScrollFix />
          </section>
        </div>
      </div>

      <CookieConsent />
    </div>
  );
}

export default App;