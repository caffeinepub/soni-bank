# Soni Bank

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Landing/home page with Soni Bank branding, hero section, and key services overview
- Services section (savings accounts, loans, credit cards, investments)
- About Us section with bank mission and values
- Contact / branch locator section
- Navigation bar with Soni Bank logo and links
- Login / Sign Up modal (auth-gated dashboard placeholder)
- Account dashboard (view balance, recent transactions, quick actions)
- Admin panel for managing users and accounts
- Footer with bank info, links, social media

### Modify
N/A

### Remove
N/A

## Implementation Plan

### Backend (Motoko)
- User registration and login (via authorization component)
- Account data model: accountId, ownerId, type (savings/checking), balance, createdAt
- Transaction data model: txId, accountId, type (deposit/withdrawal/transfer), amount, description, timestamp
- APIs:
  - getMyAccount() -> Account
  - getMyTransactions() -> [Transaction]
  - deposit(amount, description) -> Result
  - withdraw(amount, description) -> Result
  - transfer(toAccountId, amount, description) -> Result
  - Admin: getAllAccounts(), getAllUsers()
- Seed sample data for demo accounts and transactions

### Frontend
- Public landing page: hero, services cards, about, contact, footer
- Auth modal: login / register forms
- Authenticated dashboard: account balance card, recent transactions list, quick-action buttons (deposit, withdraw, transfer)
- Admin page: user list, account overview table
- Responsive layout, professional banking aesthetic
