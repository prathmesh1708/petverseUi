import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import {
  LayoutDashboard, User, PawPrint, CreditCard, ShoppingBag,
  Calendar, Star, Heart, MapPin, Settings, Edit, Trash2,
  Plus, Check, AlertCircle, X, ChevronRight, ArrowRight,
  Lock, Bell, Shield, Globe, UserMinus, DollarSign, LogOut, ArrowLeft, Wallet
} from 'lucide-react';
import './ProfileModule.css';

const ProfileModule = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  // Active Tab State
  const [activeTab, setActiveTab] = useState('dashboard');

  // URL Parameter Detection for tabs
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    if (tabParam && ['dashboard', 'owner', 'pets', 'subscriptions', 'orders', 'bookings', 'reviews', 'wishlist', 'addresses', 'settings', 'wallet'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [window.location.search]);

  // Success / Error Notification State
  const [notification, setNotification] = useState(null);

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  // ==========================================
  // STATE DEFINITIONS (Interactive Mock Data)
  // ==========================================

  // 1. Wallet Balance State
  const [walletBalance, setWalletBalance] = useState(4500);
  const [addAmount, setAddAmount] = useState('');
  const [showWalletModal, setShowWalletModal] = useState(false);

  // Wallet sub-tab state
  const [walletSubTab, setWalletSubTab] = useState('dashboard');

  // Wallet dashboard states
  const [availableCredits, setAvailableCredits] = useState(4000);
  const [refundBalance, setRefundBalance] = useState(500);
  const [promoCredits, setPromoCredits] = useState(0);
  const [pendingPayouts, setPendingPayouts] = useState(0);

  // Credit/Debit Transactions List
  const [walletTransactions, setWalletTransactions] = useState([
    { id: 'TXN-10029', type: 'credit', category: 'Refund', amount: 500, date: 'June 23, 2026 - 11:30 AM', status: 'Completed', source: 'Grooming Booking Cancellation', desc: 'Refund for booking #BK-9428 due to stylist absence.' },
    { id: 'TXN-10028', type: 'debit', category: 'Purchase', amount: 1850, date: 'June 20, 2026 - 02:15 PM', status: 'Completed', purpose: 'Marketplace Order #PV-84920' },
    { id: 'TXN-10027', type: 'credit', category: 'Cashback', amount: 200, date: 'June 18, 2026 - 09:00 AM', status: 'Completed', source: 'Promo Offer Reward', desc: 'Cashback offer for adopting adoption kit.' },
    { id: 'TXN-10026', type: 'debit', category: 'Service Booking', amount: 500, date: 'June 15, 2026 - 10:45 AM', status: 'Completed', purpose: 'Vet Appointment Dr. Amit Patel' },
    { id: 'TXN-10025', type: 'credit', category: 'Recharge', amount: 2000, date: 'June 14, 2026 - 06:12 PM', status: 'Completed', source: 'UPI Recharge', desc: 'Wallet top-up using GPay.' },
    { id: 'TXN-10024', type: 'debit', category: 'Subscription Payment', amount: 1200, date: 'June 01, 2026 - 00:05 AM', status: 'Completed', purpose: 'Gourmet Meal Plan Monthly' }
  ]);

  // Refund Tracking
  const [refunds, setRefunds] = useState([
    { id: 'REF-5021', amount: 500, source: 'Grooming Salon Cancellation', date: 'June 23, 2026', status: 'Completed', completionDate: 'June 23, 2026', statusIndex: 3 },
    { id: 'REF-5022', amount: 890, source: 'Marketplace Food Return', date: 'June 21, 2026', status: 'Processing', completionDate: 'June 26, 2026', statusIndex: 1 }
  ]);

  // Statements List
  const [statements, setStatements] = useState([
    { month: 'June 2026', dateRange: 'Jun 01 - Jun 23', totalCredits: '₹2,700', totalDebits: '₹3,550', transactionsCount: 6 },
    { month: 'May 2026', dateRange: 'May 01 - May 31', totalCredits: '₹4,500', totalDebits: '₹3,200', transactionsCount: 9 },
    { month: 'April 2026', dateRange: 'Apr 01 - Apr 30', totalCredits: '₹1,500', totalDebits: '₹1,100', transactionsCount: 4 }
  ]);

  // Wallet filters/search states
  const [walletFilterType, setWalletFilterType] = useState('all'); // all, credit, debit
  const [walletSearchQuery, setWalletSearchQuery] = useState('');
  const [walletSortOrder, setWalletSortOrder] = useState('newest'); // newest, oldest
  const [selectedTxn, setSelectedTxn] = useState(null); // for details view modal

  // Wallet statements search state
  const [statementSearch, setStatementSearch] = useState('');

  // Wallet recharge sub-states
  const [rechargeStep, setRechargeStep] = useState(1); // 1: Input/Presets, 2: Confirm/Payment, 3: Success/Fail
  const [rechargeAmount, setRechargeAmount] = useState('');
  const [rechargeMethod, setRechargeMethod] = useState('upi'); // upi, card, netbanking
  const [lastRechargeTxn, setLastRechargeTxn] = useState(null);

  // 2. Owner Details State
  const [ownerDetails, setOwnerDetails] = useState({
    name: 'John Doe',
    phone: '+91 98765 43210',
    email: 'john.doe@example.com',
    address: '101, Sea Breeze Apartments, Bandra West, Mumbai, 400050',
    emergencyContactName: 'Jane Doe',
    emergencyContactPhone: '+91 98765 43211',
    photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
  });
  const [tempOwnerDetails, setTempOwnerDetails] = useState({ ...ownerDetails });
  const [isEditingOwner, setIsEditingOwner] = useState(false);

  // Preset avatars for Owner
  const avatars = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80'
  ];

  // 3. Pet Profiles State
  const [pets, setPets] = useState([
    {
      id: 1,
      name: 'Buddy',
      breed: 'Golden Retriever',
      age: '3 Years',
      gender: 'Male',
      vaccinated: 'Fully Vaccinated',
      bio: 'Buddy loves chasing tennis balls, eating peanut butter, and going on long sunset trail walks.',
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=250&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=250&q=80',
        'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=250&q=80'
      ]
    },
    {
      id: 2,
      name: 'Coco',
      breed: 'Persian Cat',
      age: '2 Years',
      gender: 'Female',
      vaccinated: 'Fully Vaccinated',
      bio: 'Coco is a gentle princess who loves sleeping on sunny windowsills and watching birds outside.',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=250&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=250&q=80'
      ]
    }
  ]);
  const [activePetId, setActivePetId] = useState(1);
  const [showPetModal, setShowPetModal] = useState(false);
  const [petModalMode, setPetModalMode] = useState('add'); // 'add' or 'edit'
  const [selectedPet, setSelectedPet] = useState(null);
  const [petForm, setPetForm] = useState({
    name: '', breed: '', age: '', gender: 'Male', vaccinated: 'Fully Vaccinated', bio: '', image: ''
  });

  const petPresets = [
    'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=250&q=80',
    'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=250&q=80',
    'https://images.unsplash.com/photo-1537151608828-ea2b117b6b86?auto=format&fit=crop&w=250&q=80',
    'https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?auto=format&fit=crop&w=250&q=80'
  ];

  // 4. Subscriptions State
  const [subscriptions, setSubscriptions] = useState([
    { id: 1, name: 'Gourmet Meal Plan (Buddy)', type: 'Meals', status: 'Active', start: 'June 1, 2026', end: 'June 30, 2026', remaining: 7, benefits: 'Premium high-protein diet, Personalized portions, Vet approved.' },
    { id: 2, name: 'Vet Plus Care Medical', type: 'Medical Plans', status: 'Active', start: 'Jan 1, 2026', end: 'Dec 31, 2026', remaining: 191, benefits: 'Unlimited tele-consultations, 15% discount on clinic visits, Free yearly checkup.' },
    { id: 3, name: 'Spa & Grooming Deluxe', type: 'Premium Services', status: 'Paused', start: 'May 15, 2026', end: 'Aug 15, 2026', remaining: 53, benefits: '1 Grooming session/month, De-shedding treatment, Nail trimming.' }
  ]);

  // 5. Orders State (Timeline Tracking)
  const [orders, setOrders] = useState([
    {
      id: 'PV-84920',
      date: 'June 20, 2026',
      deliveryDate: 'June 25, 2026',
      total: '₹1,850',
      items: 'Ortho Comfort Dog Bed x1, Durable Chewing Bone x2',
      status: 'Shipped', // Placed, Packed, Shipped, Delivered
      statusIndex: 2
    },
    {
      id: 'PV-83211',
      date: 'June 15, 2026',
      deliveryDate: 'June 18, 2026',
      total: '₹890',
      items: 'Organic Salmon Meal Cat Food 2kg x1',
      status: 'Delivered',
      statusIndex: 3
    }
  ]);

  // 6. Bookings State
  const [bookings, setBookings] = useState([
    { id: 1, service: 'Veterinary Appointment', provider: 'Dr. Amit Patel', dateTime: 'June 25, 2026 - 3:00 PM', status: 'Scheduled' },
    { id: 2, service: 'Deluxe Grooming Spa', provider: 'Paws & Claws Salon', dateTime: 'June 18, 2026 - 11:00 AM', status: 'Completed' },
    { id: 3, service: 'Memorial Service Support', provider: 'PetVerse Memorial Services', dateTime: 'June 23, 2026 - 4:30 PM', status: 'Completed' }
  ]);

  // 7. Reviews State
  const [reviews, setReviews] = useState([
    { id: 1, target: 'Dr. Amit Patel', rating: 5, date: 'June 10, 2026', text: 'Excellent doctor! Dr. Amit was extremely gentle with Buddy during the vaccination process. Highly recommended.' },
    { id: 2, target: 'Paws & Claws Salon', rating: 4, date: 'May 28, 2026', text: 'Great grooming session. Buddy looks so neat and clean! They were polite and handled him with love.' }
  ]);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editReviewText, setEditReviewText] = useState('');
  const [editReviewRating, setEditReviewRating] = useState(5);

  // 8. Saved Items State
  const [savedItems, setSavedItems] = useState([
    { id: 1, name: 'Orthopedic memory foam bed', category: 'Products', price: '₹2,500', img: 'https://images.unsplash.com/photo-1541599540903-216a46ca1ad0?auto=format&fit=crop&w=150&q=80' },
    { id: 2, name: 'Dr. Amit Patel (Pet Surgeon)', category: 'Doctors', price: '₹500 / visit', img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=150&q=80' },
    { id: 3, name: 'Paws & Claws Salon', category: 'Vendors', price: 'Varies', img: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&w=150&q=80' },
    { id: 4, name: 'PetVerse Walkathon 2026', category: 'Events', price: 'Free Entry', img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=150&q=80' }
  ]);

  // 9. Address Book State
  const [addresses, setAddresses] = useState([
    { id: 1, tag: 'Home', isDefault: true, address: '101, Sea Breeze Apartments, Bandra West, Mumbai, 400050' },
    { id: 2, tag: 'Office', isDefault: false, address: '504, Tech Park, Hiranandani, Powai, Mumbai, 400076' }
  ]);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addressModalMode, setAddressModalMode] = useState('add'); // 'add' or 'edit'
  const [activeAddressId, setActiveAddressId] = useState(null);
  const [addressForm, setAddressForm] = useState({ tag: 'Home', address: '' });

  // 10. Account Settings State
  const [settings, setSettings] = useState({
    emailNotif: true,
    smsNotif: true,
    pushNotif: false,
    publicProfile: true,
    showPetDetails: true,
    language: 'English'
  });
  const [passwords, setPasswords] = useState({ oldPass: '', newPass: '', confirmPass: '' });
  const [blockedUsers, setBlockedUsers] = useState(['User_9420', 'SpamShop_Ind']);

  // ==========================================
  // GSAP AND ANIMATION EFFECT ON LOAD
  // ==========================================
  useEffect(() => {
    // Stagger in sidebar menu items only once on mount
    const ctx = gsap.context(() => {
      gsap.from('.profile-sidebar-item', {
        x: -30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.out',
        onComplete: () => {
          gsap.set('.profile-sidebar-item', { clearProps: 'all' });
          document.querySelectorAll('.profile-sidebar-item').forEach(el => el.classList.add('ready'));
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Transition the main content card on tab change
    const ctx = gsap.context(() => {
      gsap.from('.profile-main-card', {
        opacity: 0,
        y: 20,
        duration: 0.4,
        ease: 'power2.out',
        onComplete: () => {
          gsap.set('.profile-main-card', { clearProps: 'all' });
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, [activeTab]);

  // ==========================================
  // HANDLERS AND HELPERS
  // ==========================================

  // Wallet
  const handleAddWalletMoney = (e) => {
    e.preventDefault();
    const amt = parseFloat(addAmount);
    if (isNaN(amt) || amt <= 0) {
      showNotification('error', 'Please enter a valid amount.');
      return;
    }
    setWalletBalance(prev => prev + amt);
    setAddAmount('');
    setShowWalletModal(false);
    showNotification('success', `Successfully added ₹${amt} to your wallet!`);
  };

  // Owner Form Validation and Save
  const handleSaveOwnerDetails = (e) => {
    e.preventDefault();
    // basic validations
    if (!tempOwnerDetails.name.trim()) {
      showNotification('error', 'Name cannot be empty.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(tempOwnerDetails.email)) {
      showNotification('error', 'Invalid email format.');
      return;
    }
    if (tempOwnerDetails.phone.length < 10) {
      showNotification('error', 'Invalid phone number.');
      return;
    }
    setOwnerDetails({ ...tempOwnerDetails });
    setIsEditingOwner(false);
    showNotification('success', 'Profile details updated successfully!');
  };

  // Pet Profile Add/Edit/Delete
  const handleAddOrEditPet = (e) => {
    e.preventDefault();
    if (!petForm.name.trim() || !petForm.breed.trim() || !petForm.age.trim()) {
      showNotification('error', 'Please fill in Name, Breed, and Age.');
      return;
    }
    const petImg = petForm.image || petPresets[0];

    if (petModalMode === 'add') {
      const newPet = {
        id: Date.now(),
        name: petForm.name,
        breed: petForm.breed,
        age: petForm.age,
        gender: petForm.gender,
        vaccinated: petForm.vaccinated,
        bio: petForm.bio || 'No bio written yet.',
        image: petImg,
        gallery: [petImg]
      };
      setPets(prev => [...prev, newPet]);
      setActivePetId(newPet.id);
      showNotification('success', `${petForm.name} profile added!`);
    } else {
      setPets(prev => prev.map(p => p.id === selectedPet.id ? { ...p, ...petForm, image: petImg } : p));
      showNotification('success', `${petForm.name} profile updated!`);
    }
    setShowPetModal(false);
  };

  const handleOpenPetModal = (mode, pet = null) => {
    setPetModalMode(mode);
    setSelectedPet(pet);
    if (mode === 'edit' && pet) {
      setPetForm({
        name: pet.name,
        breed: pet.breed,
        age: pet.age,
        gender: pet.gender,
        vaccinated: pet.vaccinated,
        bio: pet.bio,
        image: pet.image
      });
    } else {
      setPetForm({
        name: '', breed: '', age: '', gender: 'Male', vaccinated: 'Fully Vaccinated', bio: '', image: ''
      });
    }
    setShowPetModal(true);
  };

  const handleDeletePet = (petId) => {
    if (pets.length <= 1) {
      showNotification('error', 'You must have at least one pet profile.');
      return;
    }
    const petToDelete = pets.find(p => p.id === petId);
    if (window.confirm(`Are you sure you want to delete ${petToDelete.name}?`)) {
      setPets(prev => prev.filter(p => p.id !== petId));
      if (activePetId === petId) {
        const remaining = pets.filter(p => p.id !== petId);
        setActivePetId(remaining[0].id);
      }
      showNotification('success', `${petToDelete.name} profile removed.`);
    }
  };

  // Subscription Actions
  const handleSubscriptionAction = (id, action) => {
    setSubscriptions(prev => prev.map(sub => {
      if (sub.id === id) {
        if (action === 'cancel') return { ...sub, status: 'Cancelled', remaining: 0 };
        if (action === 'pause') return { ...sub, status: 'Paused' };
        if (action === 'resume') return { ...sub, status: 'Active' };
        if (action === 'renew') return { ...sub, status: 'Active', remaining: sub.remaining + 30 };
        if (action === 'upgrade') return { ...sub, name: sub.name.replace('Deluxe', 'Premium Elite').replace('Plus', 'Ultimate'), benefits: 'All Elite perks, 24/7 prioritized concierge support, additional services.' };
      }
      return sub;
    }));
    showNotification('success', `Subscription successfully updated (${action})`);
  };

  // Reviews
  const handleDeleteReview = (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      setReviews(prev => prev.filter(r => r.id !== id));
      showNotification('success', 'Review deleted successfully.');
    }
  };

  const handleEditReviewSave = (e) => {
    e.preventDefault();
    setReviews(prev => prev.map(r => r.id === editingReviewId ? { ...r, text: editReviewText, rating: editReviewRating } : r));
    setEditingReviewId(null);
    showNotification('success', 'Review updated.');
  };

  // Saved Items
  const handleRemoveSaved = (id) => {
    setSavedItems(prev => prev.filter(i => i.id !== id));
    showNotification('success', 'Removed from Wishlist.');
  };

  const handleMoveToCart = (item) => {
    showNotification('success', `Added ${item.name} to checkout cart!`);
    handleRemoveSaved(item.id);
  };

  // Booking Rebook
  const handleRebook = (booking) => {
    showNotification('success', `Created a new request for ${booking.service} with ${booking.provider}!`);
  };

  // Addresses
  const handleAddOrEditAddress = (e) => {
    e.preventDefault();
    if (!addressForm.address.trim()) {
      showNotification('error', 'Address field cannot be empty.');
      return;
    }

    if (addressModalMode === 'add') {
      const newAddress = {
        id: Date.now(),
        tag: addressForm.tag,
        isDefault: addresses.length === 0,
        address: addressForm.address
      };
      setAddresses(prev => [...prev, newAddress]);
      showNotification('success', 'New address added.');
    } else {
      setAddresses(prev => prev.map(a => a.id === activeAddressId ? { ...a, tag: addressForm.tag, address: addressForm.address } : a));
      showNotification('success', 'Address updated.');
    }
    setShowAddressModal(false);
  };

  const handleSetDefaultAddress = (id) => {
    setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })));
    showNotification('success', 'Default address updated.');
  };

  const handleDeleteAddress = (id, isDefault) => {
    if (isDefault) {
      showNotification('error', 'Cannot delete default address. Set another default first.');
      return;
    }
    setAddresses(prev => prev.filter(a => a.id !== id));
    showNotification('success', 'Address deleted.');
  };

  const handleOpenAddressModal = (mode, addressItem = null) => {
    setAddressModalMode(mode);
    if (mode === 'edit' && addressItem) {
      setActiveAddressId(addressItem.id);
      setAddressForm({ tag: addressItem.tag, address: addressItem.address });
    } else {
      setAddressForm({ tag: 'Home', address: '' });
    }
    setShowAddressModal(true);
  };

  // Settings
  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (!passwords.oldPass || !passwords.newPass) {
      showNotification('error', 'Please fill all password fields.');
      return;
    }
    if (passwords.newPass !== passwords.confirmPass) {
      showNotification('error', 'New passwords do not match.');
      return;
    }
    setPasswords({ oldPass: '', newPass: '', confirmPass: '' });
    showNotification('success', 'Password updated successfully!');
  };

  const handleUnblockUser = (u) => {
    setBlockedUsers(prev => prev.filter(user => user !== u));
    showNotification('success', `${u} is now unblocked.`);
  };

  // ==========================================
  // WALLET HANDLERS
  // ==========================================
  const handleWalletRechargeSubmit = (e) => {
    e.preventDefault();
    const amt = parseFloat(rechargeAmount);
    if (isNaN(amt) || amt <= 10) {
      showNotification('error', 'Please enter an amount greater than ₹10.');
      return;
    }
    setRechargeStep(2);
  };

  const handleWalletRechargeConfirm = () => {
    const amt = parseFloat(rechargeAmount);
    // Simulate transaction processing
    setTimeout(() => {
      setWalletBalance(prev => prev + amt);
      setAvailableCredits(prev => prev + amt);
      const newTxn = {
        id: `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
        type: 'credit',
        category: 'Recharge',
        amount: amt,
        date: new Date().toLocaleString('en-IN', { hour12: true }),
        status: 'Completed',
        source: rechargeMethod === 'upi' ? 'UPI top-up' : rechargeMethod === 'card' ? 'Card Payment' : 'Net Banking',
        desc: 'Wallet top-up transaction.'
      };
      setWalletTransactions(prev => [newTxn, ...prev]);
      setLastRechargeTxn(newTxn);
      setRechargeStep(3);
      showNotification('success', `Wallet top-up of ₹${amt} successful!`);
    }, 1000);
  };

  const handleDownloadStatement = (monthName) => {
    showNotification('success', `Successfully downloaded statement for ${monthName} in CSV/PDF format!`);
  };

  // Active Pet object helper
  const activePet = pets.find(p => p.id === activePetId) || pets[0];

  return (
    <div className="profile-module-container" ref={containerRef}>
      {/* Toast Notification Alert */}
      {notification && (
        <div className={`toast-notification ${notification.type}`}>
          {notification.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* HEADER NAVBAR */}
      <header className="profile-header">
        <button className="back-to-dash-btn" onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={18} />
          <span>Dashboard</span>
        </button>
        <div className="profile-header-title">
          <User size={24} color="var(--color-primary)" />
          <h1>Account Management</h1>
        </div>
        <div className="profile-header-right">
          <div className="profile-header-wallet" onClick={() => setActiveTab('wallet')}>
            <DollarSign size={16} />
            <span>Balance: <strong>₹{walletBalance}</strong></span>
          </div>
          <div className="profile-header-user">
            <img src={ownerDetails.photo} alt="Owner" />
            <span>{ownerDetails.name.split(' ')[0]}</span>
          </div>
        </div>
      </header>

      {/* WORKSPACE SIDEBAR + CONTENT CONTAINER */}
      <div className="profile-content-layout">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className="profile-sidebar">
          <div className="profile-sidebar-userinfo">
            <div className="sidebar-avatar-wrapper">
              <img src={ownerDetails.photo} alt="Owner large" />
            </div>
            <h3>{ownerDetails.name}</h3>
            <p>{ownerDetails.email}</p>
          </div>

          <nav className="profile-sidebar-menu">
            <button 
              className={`profile-sidebar-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <LayoutDashboard size={18} />
              <span>Overview Dashboard</span>
            </button>
            <button 
              className={`profile-sidebar-item ${activeTab === 'owner' ? 'active' : ''}`}
              onClick={() => setActiveTab('owner')}
            >
              <User size={18} />
              <span>Owner Profile</span>
            </button>
            <button 
              className={`profile-sidebar-item ${activeTab === 'pets' ? 'active' : ''}`}
              onClick={() => setActiveTab('pets')}
            >
              <PawPrint size={18} />
              <span>My Pet Profiles</span>
            </button>
            <button 
              className={`profile-sidebar-item ${activeTab === 'subscriptions' ? 'active' : ''}`}
              onClick={() => setActiveTab('subscriptions')}
            >
              <CreditCard size={18} />
              <span>Subscriptions</span>
            </button>
            <button 
              className={`profile-sidebar-item ${activeTab === 'wallet' ? 'active' : ''}`}
              onClick={() => setActiveTab('wallet')}
            >
              <Wallet size={18} />
              <span>My Wallet</span>
            </button>
            <button 
              className={`profile-sidebar-item ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <ShoppingBag size={18} />
              <span>Marketplace Orders</span>
            </button>
            <button 
              className={`profile-sidebar-item ${activeTab === 'bookings' ? 'active' : ''}`}
              onClick={() => setActiveTab('bookings')}
            >
              <Calendar size={18} />
              <span>Booking History</span>
            </button>
            <button 
              className={`profile-sidebar-item ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              <Star size={18} />
              <span>My Reviews</span>
            </button>
            <button 
              className={`profile-sidebar-item ${activeTab === 'wishlist' ? 'active' : ''}`}
              onClick={() => setActiveTab('wishlist')}
            >
              <Heart size={18} />
              <span>Saved Items</span>
            </button>
            <button 
              className={`profile-sidebar-item ${activeTab === 'addresses' ? 'active' : ''}`}
              onClick={() => setActiveTab('addresses')}
            >
              <MapPin size={18} />
              <span>Address Book</span>
            </button>
            <button 
              className={`profile-sidebar-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <Settings size={18} />
              <span>Account Settings</span>
            </button>
          </nav>

          <button className="profile-logout-btn" onClick={() => navigate('/auth/login')}>
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </aside>

        {/* MAIN PANEL CONTENT AREA */}
        <main className="profile-main-panel">
          <div className="profile-main-card glass-panel">

            {/* ==========================================
                1. OVERVIEW DASHBOARD TAB
               ========================================== */}
            {activeTab === 'dashboard' && (
              <div className="tab-pane-container">
                <div className="pane-header">
                  <h2>Welcome Back, {ownerDetails.name}!</h2>
                  <p>Here is a summary of your PetVerse account actions and companion updates.</p>
                </div>

                {/* Dashboard statistics grid */}
                <div className="dashboard-stats-grid">
                  <div className="stat-card">
                    <div className="stat-icon-wrap"><DollarSign size={24} /></div>
                    <div className="stat-data">
                      <h3>₹{walletBalance}</h3>
                      <p>Wallet Balance</p>
                    </div>
                    <button className="stat-action-link" onClick={() => setShowWalletModal(true)}>Top Up</button>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon-wrap"><PawPrint size={24} /></div>
                    <div className="stat-data">
                      <h3>{pets.length}</h3>
                      <p>Registered Companion{pets.length > 1 ? 's' : ''}</p>
                    </div>
                    <button className="stat-action-link" onClick={() => setActiveTab('pets')}>View Profiles</button>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon-wrap"><CreditCard size={24} /></div>
                    <div className="stat-data">
                      <h3>{subscriptions.filter(s => s.status === 'Active').length} Active</h3>
                      <p>Meal & Care Plans</p>
                    </div>
                    <button className="stat-action-link" onClick={() => setActiveTab('subscriptions')}>Manage</button>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon-wrap"><ShoppingBag size={24} /></div>
                    <div className="stat-data">
                      <h3>{orders.length}</h3>
                      <p>Total Orders</p>
                    </div>
                    <button className="stat-action-link" onClick={() => setActiveTab('orders')}>Track Orders</button>
                  </div>
                </div>

                {/* Quick actions panel */}
                <div className="dashboard-section-row">
                  <div className="dashboard-subsection flex-2">
                    <h3 className="section-subtitle">Registered Pets Summary</h3>
                    <div className="dashboard-pets-row">
                      {pets.map(p => (
                        <div 
                          key={p.id} 
                          className={`dash-pet-item ${p.id === activePetId ? 'active' : ''}`}
                          onClick={() => { setActivePetId(p.id); setActiveTab('pets'); }}
                        >
                          <img src={p.image} alt={p.name} />
                          <h4>{p.name}</h4>
                          <span>{p.breed}</span>
                        </div>
                      ))}
                      <div className="dash-pet-add-card" onClick={() => { handleOpenPetModal('add'); setActiveTab('pets'); }}>
                        <Plus size={20} />
                        <span>Add Pet</span>
                      </div>
                    </div>
                  </div>

                  <div className="dashboard-subsection flex-1">
                    <h3 className="section-subtitle">Wallet Settings</h3>
                    <div className="dash-wallet-summary-card">
                      <p>Quickly recharge your account wallet for instant veterinary appointments and bookings.</p>
                      <button className="btn-primary" style={{ width: '100%' }} onClick={() => setShowWalletModal(true)}>
                        <Plus size={16} /> Add Money
                      </button>
                    </div>
                  </div>
                </div>

                {/* Recent Activities timeline */}
                <div className="dashboard-subsection" style={{ marginTop: '1.5rem' }}>
                  <h3 className="section-subtitle">Recent Activity</h3>
                  <div className="activity-timeline">
                    <div className="activity-item">
                      <div className="activity-bullet green"></div>
                      <div className="activity-info">
                        <strong>Memorial service completed</strong>
                        <span>The cremation support for Buddy's memory request was finalized successfully today.</span>
                        <span className="activity-time">Today, 4:30 PM</span>
                      </div>
                    </div>
                    <div className="activity-item">
                      <div className="activity-bullet blue"></div>
                      <div className="activity-info">
                        <strong>New Order Shipped #PV-84920</strong>
                        <span>Package containing the Orthopedic Bed is currently with the courier partner.</span>
                        <span className="activity-time">Yesterday, 10:15 AM</span>
                      </div>
                    </div>
                    <div className="activity-item">
                      <div className="activity-bullet purple"></div>
                      <div className="activity-info">
                        <strong>Review submitted</strong>
                        <span>You rated Dr. Amit Patel 5 stars for the recent consultation visit.</span>
                        <span className="activity-time">June 10, 2026</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ==========================================
                2. OWNER DETAILS SECTION
               ========================================== */}
            {activeTab === 'owner' && (
              <div className="tab-pane-container">
                <div className="pane-header">
                  <h2>Owner Profile Details</h2>
                  <p>Manage and edit your account contact and emergency info.</p>
                </div>

                <form onSubmit={handleSaveOwnerDetails} className="profile-form">
                  <div className="owner-avatar-section">
                    <div className="owner-avatar-large">
                      <img src={isEditingOwner ? tempOwnerDetails.photo : ownerDetails.photo} alt="Owner large" />
                    </div>
                    {isEditingOwner ? (
                      <div className="avatar-preset-selector">
                        <label>Select Preset Photo:</label>
                        <div className="presets-list">
                          {avatars.map((av, idx) => (
                            <img 
                              key={idx} 
                              src={av} 
                              alt={`preset ${idx}`}
                              className={tempOwnerDetails.photo === av ? 'selected' : ''}
                              onClick={() => setTempOwnerDetails({ ...tempOwnerDetails, photo: av })}
                            />
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="avatar-info">
                        <h4>Account Photo</h4>
                        <p>Change photo by clicking Edit Profile below.</p>
                      </div>
                    )}
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label htmlFor="owner-name">Full Name</label>
                      <input 
                        type="text" 
                        id="owner-name"
                        className="form-control"
                        disabled={!isEditingOwner}
                        value={isEditingOwner ? tempOwnerDetails.name : ownerDetails.name}
                        onChange={(e) => setTempOwnerDetails({ ...tempOwnerDetails, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="owner-email">Email Address</label>
                      <input 
                        type="email" 
                        id="owner-email"
                        className="form-control"
                        disabled={!isEditingOwner}
                        value={isEditingOwner ? tempOwnerDetails.email : ownerDetails.email}
                        onChange={(e) => setTempOwnerDetails({ ...tempOwnerDetails, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="owner-phone">Mobile Number</label>
                      <input 
                        type="tel" 
                        id="owner-phone"
                        className="form-control"
                        disabled={!isEditingOwner}
                        value={isEditingOwner ? tempOwnerDetails.phone : ownerDetails.phone}
                        onChange={(e) => setTempOwnerDetails({ ...tempOwnerDetails, phone: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="owner-address">Default Address</label>
                      <input 
                        type="text" 
                        id="owner-address"
                        className="form-control"
                        disabled={!isEditingOwner}
                        value={isEditingOwner ? tempOwnerDetails.address : ownerDetails.address}
                        onChange={(e) => setTempOwnerDetails({ ...tempOwnerDetails, address: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="owner-emergency-name">Emergency Contact Name</label>
                      <input 
                        type="text" 
                        id="owner-emergency-name"
                        className="form-control"
                        disabled={!isEditingOwner}
                        value={isEditingOwner ? tempOwnerDetails.emergencyContactName : ownerDetails.emergencyContactName}
                        onChange={(e) => setTempOwnerDetails({ ...tempOwnerDetails, emergencyContactName: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="owner-emergency-phone">Emergency Contact Mobile</label>
                      <input 
                        type="tel" 
                        id="owner-emergency-phone"
                        className="form-control"
                        disabled={!isEditingOwner}
                        value={isEditingOwner ? tempOwnerDetails.emergencyContactPhone : ownerDetails.emergencyContactPhone}
                        onChange={(e) => setTempOwnerDetails({ ...tempOwnerDetails, emergencyContactPhone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-actions-row">
                    {isEditingOwner ? (
                      <>
                        <button 
                          type="button" 
                          className="btn-secondary"
                          onClick={() => { setIsEditingOwner(false); setTempOwnerDetails({ ...ownerDetails }); }}
                        >
                          Cancel
                        </button>
                        <button type="submit" className="btn-primary">
                          <Check size={16} /> Save Changes
                        </button>
                      </>
                    ) : (
                      <button 
                        type="button" 
                        className="btn-primary"
                        onClick={() => { setIsEditingOwner(true); setTempOwnerDetails({ ...ownerDetails }); }}
                      >
                        <Edit size={16} /> Edit Profile
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}

            {/* ==========================================
                3. PET PROFILE MANAGEMENT
               ========================================== */}
            {activeTab === 'pets' && (
              <div className="tab-pane-container">
                <div className="pane-header-actions">
                  <div>
                    <h2>My Pet Profiles</h2>
                    <p>Register, update and switch between profiles of your beloved companions.</p>
                  </div>
                  <button className="btn-primary" onClick={() => handleOpenPetModal('add')}>
                    <Plus size={16} /> Register New Pet
                  </button>
                </div>

                {/* Pet switcher grid cards */}
                <div className="pet-profiles-grid">
                  {pets.map(p => (
                    <div 
                      key={p.id} 
                      className={`pet-profile-card ${p.id === activePetId ? 'active' : ''}`}
                      onClick={() => setActivePetId(p.id)}
                    >
                      <div className="pet-card-avatar">
                        <img src={p.image} alt={p.name} />
                      </div>
                      <div className="pet-card-info">
                        <h3>{p.name}</h3>
                        <span className="pet-card-breed">{p.breed} • {p.age}</span>
                        <span className="pet-card-gender">{p.gender}</span>
                        <span className={`pet-vaccination-badge ${p.vaccinated.toLowerCase().includes('fully') ? 'green' : 'red'}`}>
                          {p.vaccinated}
                        </span>
                      </div>
                      <div className="pet-card-actions" onClick={e => e.stopPropagation()}>
                        <button className="pet-act-btn edit" onClick={() => handleOpenPetModal('edit', p)}>
                          <Edit size={14} />
                        </button>
                        <button className="pet-act-btn delete" onClick={() => handleDeletePet(p.id)}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Active Pet detailed display */}
                {activePet && (
                  <div className="active-pet-details-container glass-panel">
                    <div className="active-pet-details-header">
                      <div className="active-pet-img">
                        <img src={activePet.image} alt={activePet.name} />
                      </div>
                      <div className="active-pet-meta">
                        <h2>{activePet.name} Details</h2>
                        <div className="active-pet-badges">
                          <span><strong>Breed:</strong> {activePet.breed}</span>
                          <span><strong>Age:</strong> {activePet.age}</span>
                          <span><strong>Gender:</strong> {activePet.gender}</span>
                          <span><strong>Status:</strong> {activePet.vaccinated}</span>
                        </div>
                        <p className="active-pet-bio">"{activePet.bio}"</p>
                      </div>
                    </div>

                    <div className="active-pet-gallery">
                      <h3>Pet Photo Gallery</h3>
                      <div className="pet-gallery-grid">
                        {activePet.gallery && activePet.gallery.map((img, idx) => (
                          <div key={idx} className="pet-gallery-item">
                            <img src={img} alt={`Buddy page ${idx}`} />
                          </div>
                        ))}
                        <div className="pet-gallery-add-placeholder">
                          <Plus size={20} />
                          <span>Add Photo</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ==========================================
                4. SUBSCRIPTION MANAGEMENT
               ========================================== */}
            {activeTab === 'subscriptions' && (
              <div className="tab-pane-container">
                <div className="pane-header">
                  <h2>Active Subscription Plans</h2>
                  <p>Review, renew, or pause active dietary and health care subscriptions.</p>
                </div>

                <div className="subscriptions-list-container">
                  {subscriptions.map(sub => (
                    <div key={sub.id} className="subscription-list-card">
                      <div className="sub-card-header">
                        <div className="sub-title-wrap">
                          <span className={`sub-status-tag ${sub.status.toLowerCase()}`}>{sub.status}</span>
                          <h3>{sub.name}</h3>
                          <span className="sub-type-badge">{sub.type}</span>
                        </div>
                        <div className="sub-dates">
                          <span>Start: <strong>{sub.start}</strong></span>
                          <span>End: <strong>{sub.end}</strong></span>
                        </div>
                      </div>
                      
                      <div className="sub-card-body">
                        <div className="sub-benefits">
                          <strong>Plan Benefits:</strong>
                          <p>{sub.benefits}</p>
                        </div>
                        {sub.status !== 'Cancelled' && (
                          <div className="sub-days-remaining">
                            <div className="days-number">{sub.remaining}</div>
                            <div className="days-label">Days Left</div>
                            <div className="days-progress-bar">
                              <div 
                                className="progress-fill" 
                                style={{ width: `${Math.min(100, (sub.remaining / 30) * 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="sub-card-actions">
                        {sub.status === 'Cancelled' ? (
                          <button className="btn-primary" onClick={() => handleSubscriptionAction(sub.id, 'renew')}>Reactivate Subscription</button>
                        ) : (
                          <>
                            <button className="btn-secondary" onClick={() => handleSubscriptionAction(sub.id, 'cancel')}>Cancel</button>
                            {sub.status === 'Paused' ? (
                              <button className="btn-secondary" onClick={() => handleSubscriptionAction(sub.id, 'resume')}>Resume</button>
                            ) : (
                              <button className="btn-secondary" onClick={() => handleSubscriptionAction(sub.id, 'pause')}>Pause</button>
                            )}
                            <button className="btn-secondary" onClick={() => handleSubscriptionAction(sub.id, 'upgrade')}>Upgrade Plan</button>
                            <button className="btn-primary" onClick={() => handleSubscriptionAction(sub.id, 'renew')}>Renew (30 Days)</button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ==========================================
                5. ORDERS MODULE
               ========================================== */}
            {activeTab === 'orders' && (
              <div className="tab-pane-container">
                <div className="pane-header">
                  <h2>Order History & Tracking</h2>
                  <p>Track delivery status and history of pet supplies bought from our marketplace.</p>
                </div>

                <div className="orders-timeline-container">
                  {orders.map(order => (
                    <div key={order.id} className="order-history-card">
                      <div className="order-card-header">
                        <div>
                          <h3>Order ID: #{order.id}</h3>
                          <p className="order-items-summary">Items: {order.items}</p>
                        </div>
                        <div className="order-header-right">
                          <span>Total: <strong>{order.total}</strong></span>
                          <span>Placed: {order.date}</span>
                        </div>
                      </div>

                      {/* Timeline status bar */}
                      <div className="order-tracking-progress-wrapper">
                        <div className="tracking-status-info">
                          <span>Status: <strong>{order.status}</strong></span>
                          {order.status !== 'Delivered' && (
                            <span>Est. Delivery: {order.deliveryDate}</span>
                          )}
                        </div>

                        <div className="tracking-timeline-bar">
                          <div 
                            className="timeline-progress-line-fill"
                            style={{ width: `${(order.statusIndex / 3) * 100}%` }}
                          ></div>
                          
                          <div className={`timeline-dot ${order.statusIndex >= 0 ? 'completed' : ''}`}>
                            <div className="dot-circle"></div>
                            <span>Placed</span>
                          </div>
                          <div className={`timeline-dot ${order.statusIndex >= 1 ? 'completed' : ''}`}>
                            <div className="dot-circle"></div>
                            <span>Packed</span>
                          </div>
                          <div className={`timeline-dot ${order.statusIndex >= 2 ? 'completed' : ''}`}>
                            <div className="dot-circle"></div>
                            <span>Shipped</span>
                          </div>
                          <div className={`timeline-dot ${order.statusIndex >= 3 ? 'completed' : ''}`}>
                            <div className="dot-circle"></div>
                            <span>Delivered</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ==========================================
                6. BOOKING HISTORY
               ========================================== */}
            {activeTab === 'bookings' && (
              <div className="tab-pane-container">
                <div className="pane-header">
                  <h2>Service Booking History</h2>
                  <p>View upcoming and completed bookings for vets, groomers, and memorial services.</p>
                </div>

                <div className="bookings-table-wrapper">
                  <table className="bookings-table">
                    <thead>
                      <tr>
                        <th>Service Type</th>
                        <th>Provider</th>
                        <th>Date & Time</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map(book => (
                        <tr key={book.id}>
                          <td style={{ fontWeight: 'bold' }}>{book.service}</td>
                          <td>{book.provider}</td>
                          <td>{book.dateTime}</td>
                          <td>
                            <span className={`booking-status-tag ${book.status.toLowerCase()}`}>
                              {book.status}
                            </span>
                          </td>
                          <td>
                            <button className="btn-secondary btn-small" onClick={() => handleRebook(book)}>
                              Book Again
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ==========================================
                7. REVIEW HISTORY
               ========================================== */}
            {activeTab === 'reviews' && (
              <div className="tab-pane-container">
                <div className="pane-header">
                  <h2>Review History</h2>
                  <p>Manage review feedback you left for veterinarians and support services.</p>
                </div>

                <div className="reviews-list-wrapper">
                  {reviews.length === 0 ? (
                    <div className="empty-state-panel">
                      <Star size={48} color="var(--color-border)" />
                      <p>You haven't posted any reviews yet.</p>
                    </div>
                  ) : (
                    reviews.map(rev => (
                      <div key={rev.id} className="review-history-card">
                        <div className="review-card-header">
                          <div>
                            <h3>Review for: {rev.target}</h3>
                            <span className="review-date">Reviewed on {rev.date}</span>
                          </div>
                          
                          {/* Star display */}
                          <div className="stars-wrapper">
                            {[1, 2, 3, 4, 5].map(starIdx => (
                              <Star 
                                key={starIdx} 
                                size={16} 
                                fill={starIdx <= rev.rating ? 'var(--color-primary)' : 'none'}
                                color={starIdx <= rev.rating ? 'var(--color-primary)' : '#ccc'}
                              />
                            ))}
                          </div>
                        </div>

                        {editingReviewId === rev.id ? (
                          <form onSubmit={handleEditReviewSave} className="edit-review-inline-form">
                            <div className="form-group">
                              <label>Rating:</label>
                              <div className="stars-input-row">
                                {[1, 2, 3, 4, 5].map(starIdx => (
                                  <button 
                                    type="button" 
                                    key={starIdx} 
                                    onClick={() => setEditReviewRating(starIdx)}
                                    style={{ background: 'none', border: 'none', padding: '2px', cursor: 'pointer' }}
                                  >
                                    <Star 
                                      size={24} 
                                      fill={starIdx <= editReviewRating ? 'var(--color-primary)' : 'none'}
                                      color={starIdx <= editReviewRating ? 'var(--color-primary)' : '#ccc'}
                                    />
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div className="form-group">
                              <label>Review Description</label>
                              <textarea
                                className="form-control"
                                rows="3"
                                value={editReviewText}
                                onChange={(e) => setEditReviewText(e.target.value)}
                                required
                              />
                            </div>
                            <div className="form-actions-row">
                              <button type="button" className="btn-secondary" onClick={() => setEditingReviewId(null)}>Cancel</button>
                              <button type="submit" className="btn-primary">Update Review</button>
                            </div>
                          </form>
                        ) : (
                          <>
                            <p className="review-card-text">"{rev.text}"</p>
                            <div className="review-card-actions">
                              <button className="review-action-btn edit" onClick={() => {
                                setEditingReviewId(rev.id);
                                setEditReviewText(rev.text);
                                setEditReviewRating(rev.rating);
                              }}>
                                <Edit size={14} /> Edit Review
                              </button>
                              <button className="review-action-btn delete" onClick={() => handleDeleteReview(rev.id)}>
                                <Trash2 size={14} /> Delete
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* ==========================================
                8. SAVED ITEMS (WISHLIST)
               ========================================== */}
            {activeTab === 'wishlist' && (
              <div className="tab-pane-container">
                <div className="pane-header">
                  <h2>Saved Items & Wishlist</h2>
                  <p>Access and manage your bookmarked products, doctors, and nearby vendors.</p>
                </div>

                {savedItems.length === 0 ? (
                  <div className="empty-state-panel">
                    <Heart size={48} color="var(--color-border)" />
                    <p>Your wishlist is empty.</p>
                  </div>
                ) : (
                  <div className="wishlist-grid">
                    {savedItems.map(item => (
                      <div key={item.id} className="wishlist-card">
                        <div className="wishlist-card-media">
                          <img src={item.img} alt={item.name} />
                          <span className="wishlist-category-tag">{item.category}</span>
                        </div>
                        <div className="wishlist-card-body">
                          <h3>{item.name}</h3>
                          <span className="wishlist-price">{item.price}</span>
                        </div>
                        <div className="wishlist-card-footer">
                          <button className="wishlist-delete-btn" title="Remove" onClick={() => handleRemoveSaved(item.id)}>
                            <Trash2 size={16} />
                          </button>
                          <button className="btn-secondary btn-small" onClick={() => showNotification('success', `Quick viewing ${item.name}`)}>
                            Quick View
                          </button>
                          <button className="btn-primary btn-small" onClick={() => handleMoveToCart(item)}>
                            Move to Cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ==========================================
                9. ADDRESS BOOK
               ========================================== */}
            {activeTab === 'addresses' && (
              <div className="tab-pane-container">
                <div className="pane-header-actions">
                  <div>
                    <h2>My Address Book</h2>
                    <p>Configure multiple delivery and service addresses below.</p>
                  </div>
                  <button className="btn-primary" onClick={() => handleOpenAddressModal('add')}>
                    <Plus size={16} /> Add Address
                  </button>
                </div>

                <div className="addresses-grid">
                  {addresses.map(addr => (
                    <div key={addr.id} className={`address-card ${addr.isDefault ? 'default' : ''}`}>
                      <div className="address-card-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span className="address-tag">{addr.tag}</span>
                          {addr.isDefault && <span className="default-badge">Default</span>}
                        </div>
                        <div className="address-card-actions">
                          <button className="addr-act-btn edit" title="Edit" onClick={() => handleOpenAddressModal('edit', addr)}>
                            <Edit size={14} />
                          </button>
                          <button className="addr-act-btn delete" title="Delete" onClick={() => handleDeleteAddress(addr.id, addr.isDefault)}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <p className="address-card-text">{addr.address}</p>
                      {!addr.isDefault && (
                        <button className="set-default-btn" onClick={() => handleSetDefaultAddress(addr.id)}>
                          Set as Default Address
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ==========================================
                10. ACCOUNT SETTINGS PANEL
               ========================================== */}
            {activeTab === 'settings' && (
              <div className="tab-pane-container">
                <div className="pane-header">
                  <h2>Account Settings</h2>
                  <p>Fine-tune security credentials, UI language preferences, and notification channels.</p>
                </div>

                <div className="settings-grid-layout">
                  
                  {/* Preferences Toggles */}
                  <div className="settings-section-card glass-panel">
                    <h3>Notification Channels</h3>
                    <div className="setting-toggle-row">
                      <div>
                        <h4>Email Notifications</h4>
                        <p>Receive weekly updates and booking reminders by email.</p>
                      </div>
                      <label className="toggle-switch">
                        <input 
                          type="checkbox" 
                          checked={settings.emailNotif}
                          onChange={(e) => setSettings({ ...settings, emailNotif: e.target.checked })}
                        />
                        <span className="slider round"></span>
                      </label>
                    </div>

                    <div className="setting-toggle-row">
                      <div>
                        <h4>SMS Alert Notifications</h4>
                        <p>Receive order delivery status via SMS.</p>
                      </div>
                      <label className="toggle-switch">
                        <input 
                          type="checkbox" 
                          checked={settings.smsNotif}
                          onChange={(e) => setSettings({ ...settings, smsNotif: e.target.checked })}
                        />
                        <span className="slider round"></span>
                      </label>
                    </div>

                    <div className="setting-toggle-row">
                      <div>
                        <h4>Realtime Web Alerts</h4>
                        <p>Recieve web-app push notices instantly.</p>
                      </div>
                      <label className="toggle-switch">
                        <input 
                          type="checkbox" 
                          checked={settings.pushNotif}
                          onChange={(e) => setSettings({ ...settings, pushNotif: e.target.checked })}
                        />
                        <span className="slider round"></span>
                      </label>
                    </div>
                  </div>

                  {/* Privacy / Language */}
                  <div className="settings-section-card glass-panel">
                    <h3>Language & Privacy</h3>
                    
                    <div className="setting-toggle-row">
                      <div>
                        <h4>Public Account Visibility</h4>
                        <p>Let other pet owners find Buddy or Coco on matchmaking feeds.</p>
                      </div>
                      <label className="toggle-switch">
                        <input 
                          type="checkbox" 
                          checked={settings.publicProfile}
                          onChange={(e) => setSettings({ ...settings, publicProfile: e.target.checked })}
                        />
                        <span className="slider round"></span>
                      </label>
                    </div>

                    <div className="form-group" style={{ marginTop: '1.25rem' }}>
                      <label htmlFor="settings-language">App Language</label>
                      <select 
                        id="settings-language" 
                        className="form-control"
                        value={settings.language}
                        onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                      >
                        <option value="English">English</option>
                        <option value="Hindi">Hindi (हिंदी)</option>
                        <option value="Spanish">Spanish (Español)</option>
                      </select>
                    </div>
                  </div>

                  {/* Password Change Form */}
                  <div className="settings-section-card glass-panel" style={{ gridColumn: '1 / -1' }}>
                    <h3>Security: Update Password</h3>
                    <form onSubmit={handlePasswordChange} className="form-grid-3">
                      <div className="form-group">
                        <label htmlFor="old-pass">Current Password</label>
                        <input 
                          type="password" 
                          id="old-pass"
                          className="form-control"
                          value={passwords.oldPass}
                          onChange={(e) => setPasswords({ ...passwords, oldPass: e.target.value })}
                          placeholder="••••••••"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="new-pass">New Password</label>
                        <input 
                          type="password" 
                          id="new-pass"
                          className="form-control"
                          value={passwords.newPass}
                          onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
                          placeholder="••••••••"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="confirm-pass">Confirm Password</label>
                        <input 
                          type="password" 
                          id="confirm-pass"
                          className="form-control"
                          value={passwords.confirmPass}
                          onChange={(e) => setPasswords({ ...passwords, confirmPass: e.target.value })}
                          placeholder="••••••••"
                        />
                      </div>
                      <div style={{ gridColumn: '1 / -1', textAlign: 'right' }}>
                        <button type="submit" className="btn-primary">
                          <Lock size={16} /> Save Security Credentials
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Blocked Users */}
                  <div className="settings-section-card glass-panel" style={{ gridColumn: '1 / -1' }}>
                    <h3>Manage Blocked Users</h3>
                    {blockedUsers.length === 0 ? (
                      <p className="no-blocked">No users are currently blocked.</p>
                    ) : (
                      <div className="blocked-users-list">
                        {blockedUsers.map(user => (
                          <div key={user} className="blocked-user-row">
                            <span>{user}</span>
                            <button className="btn-secondary btn-small" onClick={() => handleUnblockUser(user)}>
                              <UserMinus size={14} /> Unblock
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              </div>
            )}

            {/* ==========================================
                11. WALLET MODULE TAB
               ========================================== */}
            {activeTab === 'wallet' && (
              <div className="tab-pane-container">
                <div className="pane-header-actions">
                  <div>
                    <h2>My Wallet & Financial Summary</h2>
                    <p>Track your wallet balance, cashback credits, debits, refunds, and statements.</p>
                  </div>
                  <div className="wallet-tab-actions">
                    <span className="wallet-dash-balance-indicator">
                      Wallet Balance: <strong>₹{walletBalance}</strong>
                    </span>
                  </div>
                </div>

                {/* Sub tab navigation */}
                <div className="wallet-subtab-nav">
                  <button className={`wallet-subtab-btn ${walletSubTab === 'dashboard' ? 'active' : ''}`} onClick={() => setWalletSubTab('dashboard')}>
                    Summary
                  </button>
                  <button className={`wallet-subtab-btn ${walletSubTab === 'credits' ? 'active' : ''}`} onClick={() => setWalletSubTab('credits')}>
                    Credits
                  </button>
                  <button className={`wallet-subtab-btn ${walletSubTab === 'debits' ? 'active' : ''}`} onClick={() => setWalletSubTab('debits')}>
                    Debits
                  </button>
                  <button className={`wallet-subtab-btn ${walletSubTab === 'recharge' ? 'active' : ''}`} onClick={() => { setWalletSubTab('recharge'); setRechargeStep(1); }}>
                    Recharge
                  </button>
                  <button className={`wallet-subtab-btn ${walletSubTab === 'refunds' ? 'active' : ''}`} onClick={() => setWalletSubTab('refunds')}>
                    Track Refunds
                  </button>
                  <button className={`wallet-subtab-btn ${walletSubTab === 'statements' ? 'active' : ''}`} onClick={() => setWalletSubTab('statements')}>
                    Statements
                  </button>
                </div>

                {/* Sub Tab View rendering */}
                {walletSubTab === 'dashboard' && (
                  <div className="wallet-subpane animate-fade">
                    {/* Wallet Stat Cards */}
                    <div className="wallet-stats-grid">
                      <div className="wallet-stat-card border-left-primary">
                        <h4>Total Balance</h4>
                        <h3>₹{walletBalance}</h3>
                        <p>Combined wallet value</p>
                      </div>
                      <div className="wallet-stat-card border-left-green">
                        <h4>Available Credits</h4>
                        <h3>₹{availableCredits}</h3>
                        <p>Usable for purchases</p>
                      </div>
                      <div className="wallet-stat-card border-left-blue">
                        <h4>Refund Balance</h4>
                        <h3>₹{refundBalance}</h3>
                        <p>Pending / completed returns</p>
                      </div>
                      <div className="wallet-stat-card border-left-orange">
                        <h4>Promotional Credits</h4>
                        <h3>₹{promoCredits}</h3>
                        <p>Valid for promo offers</p>
                      </div>
                      <div className="wallet-stat-card border-left-purple">
                        <h4>Pending Payouts</h4>
                        <h3>₹{pendingPayouts}</h3>
                        <p>Processing to bank</p>
                      </div>
                    </div>

                    {/* Quick Actions & Recent Summary */}
                    <div className="wallet-dashboard-row">
                      <div className="wallet-dash-main">
                        <h3 className="section-subtitle">Recent Financial Activity</h3>
                        <div className="txn-list-compact">
                          {walletTransactions.slice(0, 4).map(txn => (
                            <div key={txn.id} className="txn-compact-row">
                              <div className="txn-left">
                                <span className={`txn-badge ${txn.type}`}>
                                  {txn.type === 'credit' ? 'IN' : 'OUT'}
                                </span>
                                <div className="txn-meta">
                                  <strong>{txn.category || (txn.type === 'credit' ? txn.source : txn.purpose)}</strong>
                                  <span>{txn.date}</span>
                                </div>
                              </div>
                              <span className={`txn-amount ${txn.type}`}>
                                {txn.type === 'credit' ? '+' : '-'}₹{txn.amount}
                              </span>
                            </div>
                          ))}
                        </div>
                        <button className="view-all-txn-btn" onClick={() => setWalletSubTab('credits')}>
                          View Full Transaction Logs <ArrowRight size={14} />
                        </button>
                      </div>

                      <div className="wallet-dash-sidebar">
                        <h3 className="section-subtitle">Quick Actions</h3>
                        <div className="wallet-quick-actions-panel">
                          <button className="quick-act-item" onClick={() => { setWalletSubTab('recharge'); setRechargeStep(1); }}>
                            Add Funds (UPI/Card)
                          </button>
                          <button className="quick-act-item" onClick={() => setWalletSubTab('refunds')}>
                            Check Refund Status ({refunds.filter(r => r.status === 'Processing').length} Active)
                          </button>
                          <button className="quick-act-item" onClick={() => setWalletSubTab('statements')}>
                            Get Monthly Statements
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. CREDIT TRANSACTIONS */}
                {walletSubTab === 'credits' && (
                  <div className="wallet-subpane animate-fade">
                    <div className="filter-header-bar">
                      <input 
                        type="text" 
                        placeholder="Search credits..." 
                        className="form-control wallet-search"
                        value={walletSearchQuery}
                        onChange={(e) => setWalletSearchQuery(e.target.value)}
                      />
                      <select 
                        className="form-control wallet-select"
                        value={walletFilterType}
                        onChange={(e) => setWalletFilterType(e.target.value)}
                      >
                        <option value="all">All Credits</option>
                        <option value="recharge">Top-ups</option>
                        <option value="refund">Refunds</option>
                        <option value="cashback">Cashback & Rewards</option>
                      </select>
                      <select 
                        className="form-control wallet-select"
                        value={walletSortOrder}
                        onChange={(e) => setWalletSortOrder(e.target.value)}
                      >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                      </select>
                    </div>

                    <div className="table-wrapper">
                      <table className="bookings-table">
                        <thead>
                          <tr>
                            <th>Transaction ID</th>
                            <th>Source / Description</th>
                            <th>Date & Time</th>
                            <th>Status</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {walletTransactions
                            .filter(t => t.type === 'credit')
                            .filter(t => {
                              if (walletFilterType === 'all') return true;
                              if (walletFilterType === 'recharge') return t.category.toLowerCase() === 'recharge';
                              if (walletFilterType === 'refund') return t.category.toLowerCase() === 'refund';
                              if (walletFilterType === 'cashback') return t.category.toLowerCase() === 'cashback' || t.category.toLowerCase() === 'reward';
                              return true;
                            })
                            .filter(t => t.source.toLowerCase().includes(walletSearchQuery.toLowerCase()) || t.id.toLowerCase().includes(walletSearchQuery.toLowerCase()))
                            .sort((a, b) => {
                              return walletSortOrder === 'newest' 
                                ? new Date(b.date.split(' - ')[0]) - new Date(a.date.split(' - ')[0])
                                : new Date(a.date.split(' - ')[0]) - new Date(b.date.split(' - ')[0]);
                            })
                            .map(t => (
                              <tr key={t.id} className="clickable-row" onClick={() => setSelectedTxn(t)}>
                                <td style={{ fontWeight: 'bold' }}>{t.id}</td>
                                <td>
                                  <div className="source-td">
                                    <strong>{t.source}</strong>
                                    <span>{t.desc}</span>
                                  </div>
                                </td>
                                <td>{t.date}</td>
                                <td><span className="booking-status-tag completed">{t.status}</span></td>
                                <td className="amount-td green">+₹{t.amount}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 3. DEBIT TRANSACTIONS */}
                {walletSubTab === 'debits' && (
                  <div className="wallet-subpane animate-fade">
                    <div className="filter-header-bar">
                      <input 
                        type="text" 
                        placeholder="Search purchases & bookings..." 
                        className="form-control wallet-search"
                        value={walletSearchQuery}
                        onChange={(e) => setWalletSearchQuery(e.target.value)}
                      />
                      <select 
                        className="form-control wallet-select"
                        value={walletSortOrder}
                        onChange={(e) => setWalletSortOrder(e.target.value)}
                      >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                      </select>
                    </div>

                    <div className="table-wrapper">
                      <table className="bookings-table">
                        <thead>
                          <tr>
                            <th>Transaction ID</th>
                            <th>Purpose</th>
                            <th>Date & Time</th>
                            <th>Status</th>
                            <th>Amount</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {walletTransactions
                            .filter(t => t.type === 'debit')
                            .filter(t => t.purpose.toLowerCase().includes(walletSearchQuery.toLowerCase()) || t.id.toLowerCase().includes(walletSearchQuery.toLowerCase()))
                            .sort((a, b) => {
                              return walletSortOrder === 'newest' 
                                ? new Date(b.date.split(' - ')[0]) - new Date(a.date.split(' - ')[0])
                                : new Date(a.date.split(' - ')[0]) - new Date(b.date.split(' - ')[0]);
                            })
                            .map(t => (
                              <tr key={t.id}>
                                <td style={{ fontWeight: 'bold' }}>{t.id}</td>
                                <td><strong>{t.purpose}</strong></td>
                                <td>{t.date}</td>
                                <td><span className="booking-status-tag completed">{t.status}</span></td>
                                <td className="amount-td red">-₹{t.amount}</td>
                                <td>
                                  <button className="btn-secondary btn-small" onClick={() => setSelectedTxn(t)}>
                                    Details
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 4. WALLET RECHARGE */}
                {walletSubTab === 'recharge' && (
                  <div className="wallet-subpane animate-fade">
                    <div className="recharge-layout-container glass-panel">
                      
                      {rechargeStep === 1 && (
                        <form onSubmit={handleWalletRechargeSubmit} className="recharge-form-step animate-fade">
                          <h3>Add Money to Wallet</h3>
                          <p>Enter custom amount or select from quick recharge presets.</p>
                          
                          <div className="quick-presets-grid">
                            {[500, 1000, 2000, 5000].map(val => (
                              <button 
                                key={val}
                                type="button"
                                className={`preset-btn ${rechargeAmount === val.toString() ? 'selected' : ''}`}
                                onClick={() => setRechargeAmount(val.toString())}
                              >
                                + ₹{val}
                              </button>
                            ))}
                          </div>

                          <div className="form-group" style={{ marginTop: '1.5rem' }}>
                            <label htmlFor="recharge-amount-input">Enter Custom Amount (₹)</label>
                            <input 
                              type="number" 
                              id="recharge-amount-input"
                              className="form-control"
                              placeholder="Min ₹50"
                              min="50"
                              value={rechargeAmount}
                              onChange={(e) => setRechargeAmount(e.target.value)}
                              required
                            />
                          </div>

                          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                            Proceed to Payment
                          </button>
                        </form>
                      )}

                      {rechargeStep === 2 && (
                        <div className="recharge-form-step animate-fade">
                          <h3>Recharge Payment Confirmation</h3>
                          <div className="recharge-confirm-summary">
                            <div className="confirm-row">
                              <span>Recharge Amount:</span>
                              <strong>₹{rechargeAmount}</strong>
                            </div>
                            <div className="confirm-row">
                              <span>Account:</span>
                              <strong>{ownerDetails.name}</strong>
                            </div>
                          </div>

                          <div className="payment-methods-selection">
                            <label>Select Payment Mode:</label>
                            <div className="payment-options-list">
                              <label className="pay-option">
                                <input 
                                  type="radio" 
                                  name="pay-method" 
                                  value="upi" 
                                  checked={rechargeMethod === 'upi'}
                                  onChange={() => setRechargeMethod('upi')}
                                />
                                <span>UPI App (GPay / PhonePe)</span>
                              </label>
                              <label className="pay-option">
                                <input 
                                  type="radio" 
                                  name="pay-method" 
                                  value="card" 
                                  checked={rechargeMethod === 'card'}
                                  onChange={() => setRechargeMethod('card')}
                                />
                                <span>Credit / Debit Card</span>
                              </label>
                              <label className="pay-option">
                                <input 
                                  type="radio" 
                                  name="pay-method" 
                                  value="netbanking" 
                                  checked={rechargeMethod === 'netbanking'}
                                  onChange={() => setRechargeMethod('netbanking')}
                                />
                                <span>Net Banking</span>
                              </label>
                            </div>
                          </div>

                          <div className="modal-actions" style={{ marginTop: '2rem' }}>
                            <button type="button" className="btn-secondary" onClick={() => setRechargeStep(1)}>Back</button>
                            <button type="button" className="btn-primary" onClick={handleWalletRechargeConfirm}>
                              Confirm & Pay ₹{rechargeAmount}
                            </button>
                          </div>
                        </div>
                      )}

                      {rechargeStep === 3 && lastRechargeTxn && (
                        <div className="recharge-form-step text-center animate-scale">
                          <div className="success-icon-wrapper" style={{ margin: '0 auto 1.5rem', background: '#e2f9e9', color: '#1b5e20', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Check size={48} />
                          </div>
                          <h2>Recharge Successful!</h2>
                          <p>We successfully added funds to your account wallet.</p>
                          <div className="recharge-success-details">
                            <div className="confirm-row">
                              <span>Txn ID:</span>
                              <strong>{lastRechargeTxn.id}</strong>
                            </div>
                            <div className="confirm-row">
                              <span>Amount Added:</span>
                              <strong>₹{lastRechargeTxn.amount}</strong>
                            </div>
                            <div className="confirm-row">
                              <span>New Wallet Balance:</span>
                              <strong>₹{walletBalance}</strong>
                            </div>
                          </div>
                          <button 
                            className="btn-primary" 
                            style={{ width: '100%', marginTop: '2rem' }}
                            onClick={() => { setWalletSubTab('dashboard'); setRechargeAmount(''); }}
                          >
                            Return to Wallet Dashboard
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 5. REFUND TRACKING */}
                {walletSubTab === 'refunds' && (
                  <div className="wallet-subpane animate-fade">
                    <div className="refunds-list-timeline">
                      {refunds.map(ref => (
                        <div key={ref.id} className="refund-timeline-card glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                          <div className="refund-card-header" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--color-border)', paddingBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                            <div>
                              <h3>Refund ID: #{ref.id}</h3>
                              <p className="refund-src" style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>Source: {ref.source}</p>
                            </div>
                            <div className="refund-header-right" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                              <span>Amount: <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>₹{ref.amount}</strong></span>
                              <span>Requested: {ref.date}</span>
                            </div>
                          </div>

                          <div className="refund-progress-wrapper" style={{ paddingTop: '1.25rem' }}>
                            <div className="refund-status-msg" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
                              <span>Status: <strong className={ref.status.toLowerCase()}>{ref.status}</strong></span>
                              {ref.status !== 'Completed' && (
                                <span>Exp. Completion: {ref.completionDate}</span>
                              )}
                            </div>

                            <div className="tracking-timeline-bar">
                              <div 
                                className="timeline-progress-line-fill"
                                style={{ width: `${(ref.statusIndex / 3) * 100}%` }}
                              ></div>
                              <div className={`timeline-dot ${ref.statusIndex >= 0 ? 'completed' : ''}`}>
                                <div className="dot-circle"></div>
                                <span>Requested</span>
                              </div>
                              <div className={`timeline-dot ${ref.statusIndex >= 1 ? 'completed' : ''}`}>
                                <div className="dot-circle"></div>
                                <span>Processing</span>
                              </div>
                              <div className={`timeline-dot ${ref.statusIndex >= 2 ? 'completed' : ''}`}>
                                <div className="dot-circle"></div>
                                <span>Approved</span>
                              </div>
                              <div className={`timeline-dot ${ref.statusIndex >= 3 ? 'completed' : ''}`}>
                                <div className="dot-circle"></div>
                                <span>Completed</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 6. WALLET STATEMENTS */}
                {walletSubTab === 'statements' && (
                  <div className="wallet-subpane animate-fade">
                    <div className="filter-header-bar">
                      <input 
                        type="text" 
                        placeholder="Search statements by month..." 
                        className="form-control wallet-search"
                        value={statementSearch}
                        onChange={(e) => setStatementSearch(e.target.value)}
                      />
                    </div>

                    <div className="table-wrapper">
                      <table className="bookings-table">
                        <thead>
                          <tr>
                            <th>Billing Month</th>
                            <th>Date Range</th>
                            <th>Total Credits</th>
                            <th>Total Debits</th>
                            <th>Transactions</th>
                            <th>Download Report</th>
                          </tr>
                        </thead>
                        <tbody>
                          {statements
                            .filter(st => st.month.toLowerCase().includes(statementSearch.toLowerCase()))
                            .map(st => (
                              <tr key={st.month}>
                                <td style={{ fontWeight: 'bold' }}>{st.month}</td>
                                <td>{st.dateRange}</td>
                                <td className="green" style={{ fontWeight: 'bold', color: '#1b5e20' }}>{st.totalCredits}</td>
                                <td className="red" style={{ fontWeight: 'bold', color: '#c62828' }}>{st.totalDebits}</td>
                                <td>{st.transactionsCount} Entries</td>
                                <td>
                                  <button className="btn-primary btn-small" onClick={() => handleDownloadStatement(st.month)}>
                                    Download Statement
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        </main>
      </div>

      {/* ==========================================
          MODALS / OVERLAY POPUPS (React Portals mock)
         ========================================== */}

      {/* 1. Wallet Recharge Modal */}
      {showWalletModal && (
        <div className="profile-modal-overlay">
          <div className="profile-modal-card glass-panel animate-scale">
            <div className="modal-header">
              <h3>Recharge PetVerse Wallet</h3>
              <button className="close-modal-btn" onClick={() => setShowWalletModal(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAddWalletMoney} className="modal-form">
              <div className="form-group">
                <label htmlFor="add-amount">Amount (₹)</label>
                <input 
                  type="number" 
                  id="add-amount" 
                  className="form-control"
                  placeholder="e.g. 1000"
                  value={addAmount}
                  onChange={(e) => setAddAmount(e.target.value)}
                  min="100"
                  required
                  autoFocus
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowWalletModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Recharge Now</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Add / Edit Pet Modal */}
      {showPetModal && (
        <div className="profile-modal-overlay">
          <div className="profile-modal-card pet-modal-card glass-panel animate-scale">
            <div className="modal-header">
              <h3>{petModalMode === 'add' ? 'Register New Pet Companion' : `Edit ${selectedPet?.name}'s Info`}</h3>
              <button className="close-modal-btn" onClick={() => setShowPetModal(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAddOrEditPet} className="modal-form scrollable">
              
              <div className="pet-modal-presets">
                <label>Select Preset Photo:</label>
                <div className="presets-list">
                  {petPresets.map((pr, idx) => (
                    <img 
                      key={idx} 
                      src={pr} 
                      alt={`preset ${idx}`}
                      className={petForm.image === pr ? 'selected' : ''}
                      onClick={() => setPetForm({ ...petForm, image: pr })}
                    />
                  ))}
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label htmlFor="pet-name">Companion Name</label>
                  <input 
                    type="text" 
                    id="pet-name" 
                    className="form-control"
                    value={petForm.name}
                    onChange={(e) => setPetForm({ ...petForm, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="pet-breed">Breed</label>
                  <input 
                    type="text" 
                    id="pet-breed" 
                    className="form-control"
                    placeholder="e.g. Golden Retriever"
                    value={petForm.breed}
                    onChange={(e) => setPetForm({ ...petForm, breed: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="pet-age">Age</label>
                  <input 
                    type="text" 
                    id="pet-age" 
                    className="form-control"
                    placeholder="e.g. 2 Years"
                    value={petForm.age}
                    onChange={(e) => setPetForm({ ...petForm, age: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="pet-gender">Gender</label>
                  <select 
                    id="pet-gender" 
                    className="form-control"
                    value={petForm.gender}
                    onChange={(e) => setPetForm({ ...petForm, gender: e.target.value })}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label htmlFor="pet-vaccinated">Vaccination Status</label>
                  <select 
                    id="pet-vaccinated" 
                    className="form-control"
                    value={petForm.vaccinated}
                    onChange={(e) => setPetForm({ ...petForm, vaccinated: e.target.value })}
                  >
                    <option value="Fully Vaccinated">Fully Vaccinated</option>
                    <option value="Partially Vaccinated">Partially Vaccinated</option>
                    <option value="Not Vaccinated">Not Vaccinated</option>
                  </select>
                </div>
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label htmlFor="pet-bio">Bio Description</label>
                  <textarea 
                    id="pet-bio" 
                    className="form-control"
                    rows="3"
                    placeholder="Describe your pet's personality..."
                    value={petForm.bio}
                    onChange={(e) => setPetForm({ ...petForm, bio: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowPetModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">
                  {petModalMode === 'add' ? 'Add Pet' : 'Save Info'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Add / Edit Address Modal */}
      {showAddressModal && (
        <div className="profile-modal-overlay">
          <div className="profile-modal-card glass-panel animate-scale">
            <div className="modal-header">
              <h3>{addressModalMode === 'add' ? 'Create Delivery Address' : 'Edit Address Details'}</h3>
              <button className="close-modal-btn" onClick={() => setShowAddressModal(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAddOrEditAddress} className="modal-form">
              <div className="form-group">
                <label htmlFor="address-tag">Address Tag</label>
                <select 
                  id="address-tag" 
                  className="form-control"
                  value={addressForm.tag}
                  onChange={(e) => setAddressForm({ ...addressForm, tag: e.target.value })}
                >
                  <option value="Home">Home</option>
                  <option value="Office">Office</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="address-text">Street Address</label>
                <textarea 
                  id="address-text" 
                  className="form-control"
                  rows="3"
                  placeholder="Enter full street, landmark, city and zip code"
                  value={addressForm.address}
                  onChange={(e) => setAddressForm({ ...addressForm, address: e.target.value })}
                  required
                  autoFocus
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowAddressModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">
                  {addressModalMode === 'add' ? 'Add Address' : 'Update Address'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* 4. Transaction Details Modal */}
      {selectedTxn && (
        <div className="profile-modal-overlay">
          <div className="profile-modal-card glass-panel animate-scale" style={{ maxWidth: '420px' }}>
            <div className="modal-header">
              <h3>Transaction Details</h3>
              <button className="close-modal-btn" onClick={() => setSelectedTxn(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="txn-detail-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', paddingTop: '0.5rem' }}>
              <div className="txn-detail-amount-wrap" style={{ textAlign: 'center', padding: '1rem', background: 'var(--color-bg)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                <span className={`txn-badge ${selectedTxn.type}`} style={{ display: 'inline-block', fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.5rem' }}>
                  {selectedTxn.type === 'credit' ? 'INCOMING' : 'OUTGOING'}
                </span>
                <h2 className={`txn-detail-amount ${selectedTxn.type}`} style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0 }}>
                  {selectedTxn.type === 'credit' ? '+' : '-'}₹{selectedTxn.amount}
                </h2>
                <p className="txn-detail-id" style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', margin: '0.25rem 0 0' }}>ID: {selectedTxn.id}</p>
              </div>

              <div className="txn-detail-meta-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div className="confirm-row">
                  <span>Category:</span>
                  <strong>{selectedTxn.category || (selectedTxn.type === 'credit' ? 'Credit' : 'Debit')}</strong>
                </div>
                <div className="confirm-row">
                  <span>Date & Time:</span>
                  <strong>{selectedTxn.date}</strong>
                </div>
                <div className="confirm-row">
                  <span>Status:</span>
                  <strong style={{ color: '#1b5e20' }}>{selectedTxn.status}</strong>
                </div>
                <div className="confirm-row">
                  <span>{selectedTxn.type === 'credit' ? 'Source:' : 'Purpose:'}</span>
                  <strong>{selectedTxn.source || selectedTxn.purpose}</strong>
                </div>
                {selectedTxn.desc && (
                  <div className="confirm-row-block" style={{ marginTop: '0.5rem', borderTop: '1px solid var(--color-border)', paddingTop: '0.75rem' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Description:</span>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem', fontStyle: 'italic' }}>
                      "{selectedTxn.desc}"
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="modal-actions" style={{ marginTop: '1rem' }}>
              <button className="btn-primary" style={{ width: '100%' }} onClick={() => setSelectedTxn(null)}>
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProfileModule;
