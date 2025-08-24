// Application Data
const appData = {
  featuredAssets: [
    {
      id: 1,
      name: "Manhattan Penthouse",
      type: "Real Estate",
      location: "New York, USA",
      totalValue: 15000000,
      tokenPrice: 1500,
      tokensAvailable: 7500,
      totalTokens: 10000,
      roi: "12.5%",
      riskLevel: "Medium",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400",
      description: "Luxury penthouse in Manhattan with Central Park views"
    },
    {
      id: 2,
      name: "Picasso Original",
      type: "Fine Art",
      location: "Authentication: Verified",
      totalValue: 8500000,
      tokenPrice: 850,
      tokensAvailable: 9200,
      totalTokens: 10000,
      roi: "18.3%",
      riskLevel: "High",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
      description: "Authenticated Picasso painting from his Blue Period"
    },
    {
      id: 3,
      name: "Gold Reserve Vault",
      type: "Commodities",
      location: "Swiss Bank Vault",
      totalValue: 5200000,
      tokenPrice: 520,
      tokensAvailable: 6800,
      totalTokens: 10000,
      roi: "8.7%",
      riskLevel: "Low",
      image: "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=400",
      description: "Physical gold reserves stored in Swiss bank vault"
    }
  ],
  userPortfolio: {
    totalValue: 45750,
    totalInvested: 42000,
    totalReturn: 3750,
    returnPercentage: 8.93,
    assets: [
      {
        name: "Manhattan Penthouse",
        tokens: 15,
        value: 22500,
        return: 1875
      },
      {
        name: "Picasso Original",
        tokens: 12,
        value: 10200,
        return: 1050
      },
      {
        name: "Gold Reserve Vault",
        tokens: 25,
        value: 13050,
        return: 825
      }
    ]
  },
  marketMetrics: {
    totalMarketCap: "2.8B",
    totalAssets: 1247,
    totalUsers: 15678,
    volume24h: "45.2M"
  }
};

// Global state
let currentAsset = null;
let walletConnected = false;
let currentWizardStep = 1;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing app...');
  
  // Small delay to ensure all elements are rendered
  setTimeout(() => {
    initializeNavigation();
    initializeWalletConnection();
    initializeMarketplace();
    initializeModal();
    initializeCharts();
    initializeTokenizationWizard();
    initializeGovernance();
    
    // Load initial data
    renderAssets(appData.featuredAssets);
    console.log('App initialized successfully');
  }, 100);
});

// Navigation System
function initializeNavigation() {
  console.log('Initializing navigation...');
  
  // Get all navigation buttons
  const navButtons = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.section');
  
  console.log('Found nav buttons:', navButtons.length);
  console.log('Found sections:', sections.length);
  
  navButtons.forEach((button, index) => {
    console.log(`Setting up nav button ${index}:`, button.getAttribute('data-section'));
    button.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Nav button clicked:', this.getAttribute('data-section'));
      
      const targetSection = this.getAttribute('data-section');
      showSection(targetSection);
      
      // Update active nav button
      navButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Handle navigation from other elements with data-section attribute
  document.addEventListener('click', function(e) {
    if (e.target.hasAttribute('data-section') && !e.target.classList.contains('nav-btn')) {
      e.preventDefault();
      console.log('Other element clicked with data-section:', e.target.getAttribute('data-section'));
      
      const targetSection = e.target.getAttribute('data-section');
      showSection(targetSection);
      
      // Update nav button
      navButtons.forEach(btn => btn.classList.remove('active'));
      const navBtn = document.querySelector(`[data-section="${targetSection}"].nav-btn`);
      if (navBtn) navBtn.classList.add('active');
    }
  });
}

function showSection(sectionId) {
  console.log('Showing section:', sectionId);
  
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.classList.remove('active');
  });
  
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add('active');
    targetSection.classList.add('fade-in');
    console.log('Section shown successfully:', sectionId);
  } else {
    console.error('Section not found:', sectionId);
  }
}

// Wallet Connection
function initializeWalletConnection() {
  console.log('Initializing wallet connection...');
  
  const connectWalletBtn = document.getElementById('connect-wallet');
  const walletStatus = document.getElementById('wallet-status');
  
  if (!connectWalletBtn) {
    console.error('Connect wallet button not found');
    return;
  }
  
  console.log('Connect wallet button found');
  
  connectWalletBtn.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('Connect wallet clicked, current state:', walletConnected);
    
    if (!walletConnected) {
      simulateWalletConnection();
    } else {
      disconnectWallet();
    }
  });
}

function simulateWalletConnection() {
  console.log('Simulating wallet connection...');
  
  const connectWalletBtn = document.getElementById('connect-wallet');
  const walletStatus = document.getElementById('wallet-status');
  
  connectWalletBtn.textContent = 'Connecting...';
  connectWalletBtn.disabled = true;
  
  setTimeout(() => {
    walletConnected = true;
    connectWalletBtn.classList.add('hidden');
    walletStatus.classList.remove('hidden');
    connectWalletBtn.disabled = false;
    connectWalletBtn.textContent = 'Connect Wallet';
    
    showNotification('Wallet connected successfully!', 'success');
    console.log('Wallet connected');
  }, 2000);
}

function disconnectWallet() {
  const connectWalletBtn = document.getElementById('connect-wallet');
  const walletStatus = document.getElementById('wallet-status');
  
  walletConnected = false;
  connectWalletBtn.classList.remove('hidden');
  walletStatus.classList.add('hidden');
  showNotification('Wallet disconnected', 'info');
  console.log('Wallet disconnected');
}

// Marketplace Functions
function initializeMarketplace() {
  console.log('Initializing marketplace...');
  
  const assetSearch = document.getElementById('asset-search');
  const assetFilter = document.getElementById('asset-filter');
  const riskFilter = document.getElementById('risk-filter');
  
  if (assetSearch) {
    assetSearch.addEventListener('input', handleAssetFilter);
  }
  if (assetFilter) {
    assetFilter.addEventListener('change', handleAssetFilter);
  }
  if (riskFilter) {
    riskFilter.addEventListener('change', handleAssetFilter);
  }
}

function renderAssets(assets) {
  console.log('Rendering assets:', assets.length);
  
  const assetsGrid = document.getElementById('assets-grid');
  if (!assetsGrid) {
    console.error('Assets grid not found');
    return;
  }
  
  assetsGrid.innerHTML = '';
  
  assets.forEach(asset => {
    const assetCard = createAssetCard(asset);
    assetsGrid.appendChild(assetCard);
  });
}

function createAssetCard(asset) {
  const card = document.createElement('div');
  card.className = 'asset-card';
  card.onclick = () => openAssetModal(asset);
  
  const tokensSold = asset.totalTokens - asset.tokensAvailable;
  const progressPercentage = (tokensSold / asset.totalTokens) * 100;
  
  card.innerHTML = `
    <div class="asset-image">
      <img src="${asset.image}" alt="${asset.name}">
    </div>
    <div class="asset-info">
      <div class="asset-header">
        <h3 class="asset-name">${asset.name}</h3>
        <span class="asset-type">${asset.type}</span>
      </div>
      <div class="asset-location">${asset.location}</div>
      <div class="asset-metrics">
        <div class="metric">
          <span class="metric-label">Total Value</span>
          <span class="metric-value">$${asset.totalValue.toLocaleString()}</span>
        </div>
        <div class="metric">
          <span class="metric-label">Token Price</span>
          <span class="metric-value">$${asset.tokenPrice}</span>
        </div>
        <div class="metric">
          <span class="metric-label">Expected ROI</span>
          <span class="metric-value roi">${asset.roi}</span>
        </div>
        <div class="metric">
          <span class="metric-label">Risk Level</span>
          <span class="metric-value">${asset.riskLevel}</span>
        </div>
      </div>
      <div class="asset-progress">
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${progressPercentage}%"></div>
        </div>
        <div class="progress-label">
          <span>${tokensSold} / ${asset.totalTokens} tokens sold</span>
          <span>${progressPercentage.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  `;
  
  return card;
}

function handleAssetFilter() {
  const assetSearch = document.getElementById('asset-search');
  const assetFilter = document.getElementById('asset-filter');
  const riskFilter = document.getElementById('risk-filter');
  
  const searchTerm = assetSearch ? assetSearch.value.toLowerCase() : '';
  const typeFilter = assetFilter ? assetFilter.value : '';
  const riskFilterValue = riskFilter ? riskFilter.value : '';
  
  let filteredAssets = appData.featuredAssets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm) || 
                         asset.description.toLowerCase().includes(searchTerm);
    const matchesType = !typeFilter || asset.type === typeFilter;
    const matchesRisk = !riskFilterValue || asset.riskLevel === riskFilterValue;
    
    return matchesSearch && matchesType && matchesRisk;
  });
  
  renderAssets(filteredAssets);
}

// Modal Functions
function initializeModal() {
  console.log('Initializing modal...');
  
  const assetModal = document.getElementById('asset-modal');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalClose = document.getElementById('modal-close');
  
  if (modalClose) {
    modalClose.addEventListener('click', closeAssetModal);
  }
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', closeAssetModal);
  }
  
  const tokenQuantityInput = document.getElementById('token-quantity');
  const investBtn = document.getElementById('invest-btn');
  
  if (tokenQuantityInput) {
    tokenQuantityInput.addEventListener('input', updateInvestmentAmount);
  }
  
  if (investBtn) {
    investBtn.addEventListener('click', handleInvestment);
  }
}

function openAssetModal(asset) {
  console.log('Opening asset modal for:', asset.name);
  
  currentAsset = asset;
  const assetModal = document.getElementById('asset-modal');
  
  if (!assetModal) {
    console.error('Asset modal not found');
    return;
  }
  
  // Populate modal content
  const elements = {
    'modal-asset-name': asset.name,
    'modal-total-value': `$${asset.totalValue.toLocaleString()}`,
    'modal-token-price': `$${asset.tokenPrice}`,
    'modal-roi': asset.roi,
    'modal-risk': asset.riskLevel,
    'modal-available': asset.tokensAvailable.toLocaleString(),
    'modal-description': asset.description
  };
  
  Object.entries(elements).forEach(([id, value]) => {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = value;
    }
  });
  
  // Set image
  const modalImage = document.getElementById('modal-asset-image');
  if (modalImage) {
    modalImage.src = asset.image;
  }
  
  // Reset investment form
  const tokenQuantity = document.getElementById('token-quantity');
  const investmentAmount = document.getElementById('investment-amount');
  
  if (tokenQuantity) tokenQuantity.value = '';
  if (investmentAmount) investmentAmount.textContent = '$0';
  
  assetModal.classList.remove('hidden');
}

function closeAssetModal() {
  console.log('Closing asset modal');
  
  const assetModal = document.getElementById('asset-modal');
  if (assetModal) {
    assetModal.classList.add('hidden');
  }
  currentAsset = null;
}

function updateInvestmentAmount() {
  if (!currentAsset) return;
  
  const tokenQuantity = document.getElementById('token-quantity');
  const investmentAmount = document.getElementById('investment-amount');
  
  if (!tokenQuantity || !investmentAmount) return;
  
  const quantity = parseInt(tokenQuantity.value) || 0;
  const amount = quantity * currentAsset.tokenPrice;
  investmentAmount.textContent = `$${amount.toLocaleString()}`;
}

function handleInvestment() {
  console.log('Handling investment...');
  
  if (!walletConnected) {
    showNotification('Please connect your wallet first', 'error');
    return;
  }
  
  const tokenQuantity = document.getElementById('token-quantity');
  if (!tokenQuantity) return;
  
  const quantity = parseInt(tokenQuantity.value);
  if (!quantity || quantity < 1) {
    showNotification('Please enter a valid token quantity', 'error');
    return;
  }
  
  if (quantity > currentAsset.tokensAvailable) {
    showNotification('Insufficient tokens available', 'error');
    return;
  }
  
  // Simulate investment process
  const investBtn = document.getElementById('invest-btn');
  if (investBtn) {
    investBtn.textContent = 'Processing...';
    investBtn.disabled = true;
    
    setTimeout(() => {
      showNotification(`Successfully invested in ${quantity} tokens of ${currentAsset.name}!`, 'success');
      closeAssetModal();
      investBtn.textContent = 'Invest Now';
      investBtn.disabled = false;
    }, 2000);
  }
}

// Charts and Analytics
function initializeCharts() {
  console.log('Initializing charts...');
  
  // Add a longer delay to ensure Chart.js is loaded
  setTimeout(() => {
    try {
      if (typeof Chart !== 'undefined') {
        if (document.getElementById('market-growth-chart')) {
          createMarketGrowthChart();
        }
        if (document.getElementById('asset-distribution-chart')) {
          createAssetDistributionChart();
        }
        if (document.getElementById('performance-chart')) {
          createPerformanceChart();
        }
      } else {
        console.error('Chart.js not loaded');
      }
    } catch (error) {
      console.error('Error initializing charts:', error);
    }
  }, 500);
}

function createMarketGrowthChart() {
  const ctx = document.getElementById('market-growth-chart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['2024', '2025', '2027', '2030', '2034'],
      datasets: [{
        label: 'Market Size (USD)',
        data: [15.2, 28.5, 89.2, 2800, 30000],
        borderColor: '#1FB8CD',
        backgroundColor: 'rgba(31, 184, 205, 0.1)',
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          type: 'logarithmic',
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              if (value >= 1000) return '$' + (value/1000) + 'T';
              if (value >= 1) return '$' + value + 'B';
              return '$' + value + 'B';
            }
          }
        }
      }
    }
  });
}

function createAssetDistributionChart() {
  const ctx = document.getElementById('asset-distribution-chart').getContext('2d');
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Real Estate', 'Private Credit', 'Commodities', 'Fine Art', 'Other'],
      datasets: [{
        data: [35, 30, 15, 12, 8],
        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}

function createPerformanceChart() {
  const ctx = document.getElementById('performance-chart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Monthly Returns (%)',
        data: [8.2, 12.5, 15.3, 9.8, 18.7, 22.1],
        backgroundColor: '#1FB8CD',
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return value + '%';
            }
          }
        }
      }
    }
  });
}

// Tokenization Wizard
function initializeTokenizationWizard() {
  console.log('Initializing tokenization wizard...');
  // Wizard is controlled by global functions
}

function nextStep() {
  console.log('Next step clicked, current:', currentWizardStep);
  
  if (currentWizardStep < 4) {
    // Hide current step
    const currentStepContent = document.querySelector(`[data-step-content="${currentWizardStep}"]`);
    const currentStepIndicator = document.querySelector(`[data-step="${currentWizardStep}"]`);
    
    if (currentStepContent) currentStepContent.classList.remove('active');
    if (currentStepIndicator) currentStepIndicator.classList.remove('active');
    
    // Show next step
    currentWizardStep++;
    const nextStepContent = document.querySelector(`[data-step-content="${currentWizardStep}"]`);
    const nextStepIndicator = document.querySelector(`[data-step="${currentWizardStep}"]`);
    
    if (nextStepContent) nextStepContent.classList.add('active');
    if (nextStepIndicator) nextStepIndicator.classList.add('active');
  }
}

function prevStep() {
  console.log('Previous step clicked, current:', currentWizardStep);
  
  if (currentWizardStep > 1) {
    // Hide current step
    const currentStepContent = document.querySelector(`[data-step-content="${currentWizardStep}"]`);
    const currentStepIndicator = document.querySelector(`[data-step="${currentWizardStep}"]`);
    
    if (currentStepContent) currentStepContent.classList.remove('active');
    if (currentStepIndicator) currentStepIndicator.classList.remove('active');
    
    // Show previous step
    currentWizardStep--;
    const prevStepContent = document.querySelector(`[data-step-content="${currentWizardStep}"]`);
    const prevStepIndicator = document.querySelector(`[data-step="${currentWizardStep}"]`);
    
    if (prevStepContent) prevStepContent.classList.add('active');
    if (prevStepIndicator) prevStepIndicator.classList.add('active');
  }
}

function submitTokenization() {
  console.log('Submit tokenization clicked');
  
  if (!walletConnected) {
    showNotification('Please connect your wallet first', 'error');
    return;
  }
  
  showNotification('Tokenization request submitted! You will be notified once reviewed.', 'success');
  
  // Reset wizard
  currentWizardStep = 1;
  document.querySelectorAll('.wizard-step').forEach(step => step.classList.remove('active'));
  document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));
  
  const firstStep = document.querySelector('[data-step-content="1"]');
  const firstIndicator = document.querySelector('[data-step="1"]');
  
  if (firstStep) firstStep.classList.add('active');
  if (firstIndicator) firstIndicator.classList.add('active');
  
  // Clear form
  document.querySelectorAll('.wizard-content input, .wizard-content select, .wizard-content textarea').forEach(input => {
    input.value = '';
  });
}

// Governance Functions
function initializeGovernance() {
  console.log('Initializing governance...');
  
  const voteButtons = document.querySelectorAll('.vote-btn');
  console.log('Found vote buttons:', voteButtons.length);
  
  voteButtons.forEach(button => {
    button.addEventListener('click', handleVote);
  });
}

function handleVote(e) {
  console.log('Vote button clicked');
  
  if (!walletConnected) {
    showNotification('Please connect your wallet to vote', 'error');
    return;
  }
  
  const vote = e.target.getAttribute('data-vote');
  const proposalCard = e.target.closest('.proposal-card');
  const proposalTitle = proposalCard ? proposalCard.querySelector('h3').textContent : 'Unknown';
  
  e.target.textContent = 'Voting...';
  e.target.disabled = true;
  
  setTimeout(() => {
    showNotification(`Vote "${vote}" submitted for "${proposalTitle}"`, 'success');
    e.target.textContent = `Vote ${vote.charAt(0).toUpperCase() + vote.slice(1)}`;
    e.target.disabled = false;
    
    // Disable all voting buttons for this proposal
    if (proposalCard) {
      proposalCard.querySelectorAll('.vote-btn').forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = '0.5';
      });
    }
  }, 1500);
}

// Utility Functions
function showNotification(message, type = 'info') {
  console.log('Showing notification:', message, type);
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 16px 20px;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    box-shadow: var(--shadow-lg);
    z-index: 1001;
    max-width: 300px;
    animation: slideIn 0.3s ease-out;
  `;
  
  // Set notification color based on type
  if (type === 'success') {
    notification.style.borderColor = 'var(--color-success)';
    notification.style.color = 'var(--color-success)';
  } else if (type === 'error') {
    notification.style.borderColor = 'var(--color-error)';
    notification.style.color = 'var(--color-error)';
  } else if (type === 'warning') {
    notification.style.borderColor = 'var(--color-warning)';
    notification.style.color = 'var(--color-warning)';
  }
  
  notification.textContent = message;
  document.body.appendChild(notification);
  
  // Remove notification after 4 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-in';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 4000);
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(notificationStyles);

// Make functions globally accessible
window.nextStep = nextStep;
window.prevStep = prevStep;
window.submitTokenization = submitTokenization;

