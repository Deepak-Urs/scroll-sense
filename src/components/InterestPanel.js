import React from 'react';

export default function InterestPanel({
  addictiveInput,
  goodInput,
  addictiveInterests,
  goodInterests,
  canShowFeed,
  handleAddictiveInputChange,
  handleGoodInputChange,
  handleAddAddictive,
  handleAddGood
}) {
  return (
    <div className="interest-panel">
      <h2 className="interest-panel__title">Scroll Sense</h2>
      <div className="interest-panel__section">
        <label className="interest-panel__label">Addictive Interests (comma separated):</label>
        <div className="interest-panel__input-row">
          <input
            type="text"
            value={addictiveInput}
            onChange={handleAddictiveInputChange}
            placeholder="e.g. TikTok, Instagram, Gaming"
            className="interest-panel__input"
          />
          <button onClick={handleAddAddictive} className="interest-panel__add-btn interest-panel__add-btn--addictive">Add</button>
        </div>
        <div className="interest-panel__added">
          {addictiveInterests.length > 0 && (
            <span>Added: {addictiveInterests.join(', ')}</span>
          )}
        </div>
      </div>
      <div className="interest-panel__section">
        <label className="interest-panel__label">Good Interests (comma separated):</label>
        <div className="interest-panel__input-row">
          <input
            type="text"
            value={goodInput}
            onChange={handleGoodInputChange}
            placeholder="e.g. Reading, Yoga, Coding"
            className="interest-panel__input"
          />
          <button onClick={handleAddGood} className="interest-panel__add-btn interest-panel__add-btn--good">Add</button>
        </div>
        <div className="interest-panel__added">
          {goodInterests.length > 0 && (
            <span>Added: {goodInterests.join(', ')}</span>
          )}
        </div>
      </div>
      <div className={`interest-panel__status ${canShowFeed ? 'interest-panel__status--active' : 'interest-panel__status--inactive'}`}>
        {canShowFeed ? 'Feed is now active!' : `Please enter at least 10 interests to activate the feed.`}
      </div>
    </div>
  );
}
