# 📚 Week 2: Components & State + User System

Building on Week 1's foundations, this week you'll master Svelte stores, component lifecycle, and add user authentication to your kanban board.

## 🎯 Week Overview

**Duration:** 7 days  
**Daily Time:** 3-4 hours  
**Goal:** Master state management and build user authentication system  

## 📖 Official Tutorial Sections

Work through these sections on [learn.svelte.dev](https://learn.svelte.dev/):

### Day 8-9: Advanced Events & Bindings
- [ ] Component events
- [ ] Event forwarding
- [ ] DOM event forwarding
- [ ] This binding
- [ ] Component bindings
- [ ] Binding to component instances

### Day 10-11: Lifecycle & Stores
- [ ] onMount
- [ ] onDestroy
- [ ] beforeUpdate and afterUpdate
- [ ] tick
- [ ] Writable stores
- [ ] Auto-subscriptions
- [ ] Store bindings

### Day 12-13: Advanced Stores
- [ ] Readable stores
- [ ] Derived stores
- [ ] Custom stores
- [ ] Store contracts

### Day 14: Review & Polish
- [ ] Review all Week 2 concepts
- [ ] Practice store patterns
- [ ] Experiment with lifecycle methods

## 🛠️ Daily Project Tasks

### Day 8: Component Lifecycle + Advanced Events
**Time:** 3 hours

**Tasks:**
1. Add component lifecycle logging to understand mounting/updating
2. Implement auto-save functionality using lifecycle hooks
3. Create notification system with timed dismissals
4. Add keyboard shortcut manager using component events
5. Implement focus management for better UX

**Key Concepts:**
- Component lifecycle understanding
- Event delegation patterns
- Auto-save implementation
- Focus management

**Deliverable:** Enhanced UX with auto-save and notifications

**Commit:** `feat: component lifecycle management and notifications`

### Day 9: Bindings + Form Enhancement
**Time:** 3 hours

**Tasks:**
1. Create reusable form components with proper binding
2. Add form auto-focus management
3. Implement form dirty state tracking
4. Create modal component system with focus trapping
5. Add form validation patterns

**Key Concepts:**
- Advanced binding patterns
- Form state management
- Modal component design
- Accessibility considerations

**Deliverable:** Professional form components

**Commit:** `feat: advanced form components with binding patterns`

### Day 10: Lifecycle Hooks + Backend Setup
**Time:** 3-4 hours

**Tasks:**
1. Initialize SvelteKit backend structure
2. Set up SQLite database with better-sqlite3
3. Create database schema for users and tasks
4. Implement data migration scripts
5. Add environment variable configuration

**Key Concepts:**
- SvelteKit server-side setup
- Database design
- Migration patterns
- Environment configuration

**Deliverable:** Working backend with database

**Commit:** `feat: SvelteKit backend with SQLite database setup`

### Day 11: Writable Stores + Authentication
**Time:** 3-4 hours

**Tasks:**
1. Create authentication store with user state
2. Implement user registration system
3. Add login/logout functionality with JWT
4. Create protected route middleware
5. Add password hashing with bcrypt

**Key Concepts:**
- Store-based state management
- JWT authentication
- Password security
- Route protection

**Deliverable:** Complete authentication system

**Commit:** `feat: user authentication system with Svelte stores`

### Day 12: Readable & Derived Stores
**Time:** 3 hours

**Tasks:**
1. Create project management store
2. Implement user preferences store
3. Add theme switching capability (light/dark)
4. Create notification store with derived states
5. Add user activity tracking

**Key Concepts:**
- Store composition patterns
- Derived store calculations
- Theme management
- Activity tracking

**Deliverable:** Advanced store architecture

**Commit:** `feat: advanced store patterns for state management`

### Day 13: Data Persistence + API Integration
**Time:** 3-4 hours

**Tasks:**
1. Connect frontend stores to database
2. Implement task synchronization between client/server
3. Add offline capability detection
4. Create data conflict resolution
5. Add loading states and error handling

**Key Concepts:**
- Client-server synchronization
- Offline/online state management
- Error handling patterns
- Loading state design

**Deliverable:** Robust data synchronization

**Commit:** `feat: database integration with offline support`

### Day 14: Team Features + Polish
**Time:** 4 hours

**Tasks:**
1. Create user profile management
2. Add team/workspace concept
3. Implement task assignment to team members
4. Add user avatars and presence indicators
5. Create team dashboard with statistics
6. Record demo video

**Key Concepts:**
- Multi-user architecture
- Team data modeling
- Avatar management
- Dashboard design

**Deliverable:** Multi-user collaborative system

**Commit:** `feat: team collaboration features and user profiles`

## 🏗️ Architecture Patterns

### Store Structure
```javascript
// stores/auth.js
import { writable } from 'svelte/store';

function createAuthStore() {
  const { subscribe, set, update } = writable({
    user: null,
    token: null,
    loading: false
  });

  return {
    subscribe,
    login: async (email, password) => {
      update(state => ({ ...state, loading: true }));
      // Login logic
    },
    logout: () => set({ user: null, token: null, loading: false }),
    register: async (userData) => {
      // Registration logic
    }
  };
}

export const auth = createAuthStore();
```

### Database Schema
```sql
-- users table
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- teams table
CREATE TABLE teams (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  created_by INTEGER REFERENCES users(id),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- team_members table
CREATE TABLE team_members (
  team_id INTEGER REFERENCES teams(id),
  user_id INTEGER REFERENCES users(id),
  role TEXT DEFAULT 'member',
  joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (team_id, user_id)
);

-- tasks table (updated)
CREATE TABLE tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'todo',
  priority TEXT DEFAULT 'medium',
  due_date DATE,
  assigned_to INTEGER REFERENCES users(id),
  team_id INTEGER REFERENCES teams(id),
  created_by INTEGER REFERENCES users(id),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Component Lifecycle Patterns
```svelte
<script>
  import { onMount, onDestroy, beforeUpdate, afterUpdate } from 'svelte';
  
  let mounted = false;
  let updateCount = 0;
  
  onMount(() => {
    console.log('Component mounted');
    mounted = true;
    return () => {
      console.log('Cleanup function called');
    };
  });
  
  beforeUpdate(() => {
    console.log('Before update', updateCount);
  });
  
  afterUpdate(() => {
    console.log('After update', ++updateCount);
  });
  
  onDestroy(() => {
    console.log('Component destroyed');
  });
</script>
```

## 🔒 Security Considerations

### Password Hashing
```javascript
// lib/auth.js
import bcrypt from 'bcrypt';

export async function hashPassword(password) {
  return await bcrypt.hash(password, 12);
}

export async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}
```

### JWT Implementation
```javascript
// lib/jwt.js
import jwt from 'jsonwebtoken';

export function createToken(user) {
  return jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}
```

## 🎨 UI/UX Improvements

### Theme Switching
```javascript
// stores/theme.js
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const defaultTheme = 'light';

const initialTheme = browser 
  ? localStorage.getItem('theme') ?? defaultTheme 
  : defaultTheme;

export const theme = writable(initialTheme);

theme.subscribe((value) => {
  if (browser) {
    localStorage.setItem('theme', value);
    document.documentElement.setAttribute('data-theme', value);
  }
});
```

### Loading States
```svelte
<script>
  import { auth } from '$lib/stores/auth.js';
  
  let loading = false;
  
  async function handleLogin() {
    loading = true;
    try {
      await auth.login(email, password);
    } finally {
      loading = false;
    }
  }
</script>

<button 
  class="btn btn-primary" 
  disabled={loading}
  on:click={handleLogin}
>
  {#if loading}
    <Spinner size="sm" />
    Logging in...
  {:else}
    Log In
  {/if}
</button>
```

## 🧪 Testing Your Understanding

After each day, verify you can:
1. Explain when each lifecycle method runs
2. Create custom stores for different use cases
3. Implement user authentication from scratch
4. Design multi-user data structures
5. Handle loading and error states properly

## 🎯 Week 2 Success Criteria

By the end of Week 2, you should be able to:
- [ ] Use all Svelte lifecycle methods appropriately
- [ ] Create and compose custom stores
- [ ] Implement user authentication systems
- [ ] Design multi-user applications
- [ ] Handle async operations with proper loading states
- [ ] Synchronize client and server state

## 🎬 Demo Requirements

Create a 3-4 minute video showing:
1. User registration and login
2. Creating tasks assigned to different users
3. Theme switching (light/dark mode)
4. Data persisting across browser sessions
5. Team collaboration features

## 🐛 Common Pitfalls

### Store Subscriptions
```svelte
<!-- ❌ Wrong: Manual subscription management -->
<script>
  import { userStore } from '$lib/stores/user.js';
  
  let user;
  const unsubscribe = userStore.subscribe(value => user = value);
  // Forgot to unsubscribe!
</script>

<!-- ✅ Correct: Auto-subscription -->
<script>
  import { userStore } from '$lib/stores/user.js';
</script>

<p>Hello, {$userStore.name}!</p>
```

### Async Store Updates
```javascript
// ❌ Wrong: Not handling errors
async function updateUser(data) {
  userStore.set(data); // What if this fails?
}

// ✅ Correct: Proper error handling
async function updateUser(data) {
  try {
    userStore.update(state => ({ ...state, loading: true }));
    const result = await api.updateUser(data);
    userStore.set({ ...result, loading: false });
  } catch (error) {
    userStore.update(state => ({ 
      ...state, 
      loading: false, 
      error: error.message 
    }));
  }
}
```

## 📚 Additional Resources

### Week 2 Specific
- [Svelte Stores Documentation](https://svelte.dev/docs#run-time-svelte-store)
- [Component Lifecycle](https://svelte.dev/tutorial/onmount)
- [SvelteKit Authentication](https://kit.svelte.dev/docs/authentication)

### Authentication Tutorials
- [JWT Authentication Guide](https://jwt.io/introduction)
- [Password Hashing Best Practices](https://auth0.com/blog/hashing-passwords-one-way-road-to-security/)

---

**Next:** Week 3 focuses on SvelteKit full-stack development, file uploads, and team management features.

**Questions?** Create an issue or ask in the Svelte Discord!

Good luck with Week 2! 🚀