# 📚 Week 1: Svelte Fundamentals + Kanban Board

Welcome to your first week of Svelte training! This week you'll learn the core concepts of Svelte while building a functional kanban board.

## 🎯 Week Overview

**Duration:** 7 days  
**Daily Time:** 3-4 hours  
**Goal:** Master Svelte fundamentals and build a drag & drop kanban board  

## 📖 Official Tutorial Sections

Work through these sections on [learn.svelte.dev](https://learn.svelte.dev/):

### Day 1-2: Basics
- [ ] Introduction
- [ ] Adding data
- [ ] Dynamic attributes
- [ ] Styling
- [ ] HTML tags

### Day 3-4: Reactivity
- [ ] Assignments
- [ ] Declarations
- [ ] Statements
- [ ] Updating arrays and objects

### Day 5-6: Props & Logic
- [ ] Declaring props
- [ ] Default values
- [ ] Spread props
- [ ] If blocks
- [ ] Else blocks
- [ ] Each blocks
- [ ] Keyed each blocks

### Day 7: Events & Forms
- [ ] DOM events
- [ ] Inline handlers
- [ ] Event modifiers
- [ ] Component events
- [ ] Text inputs
- [ ] Checkbox inputs
- [ ] Select bindings

## 🛠️ Daily Project Tasks

### Day 1: Project Setup + Basic Components
**Time:** 3 hours

**Morning (1.5h):** Tutorial sections + notes
**Afternoon (1.5h):** Project work

**Tasks:**
1. Initialize SvelteKit project with `npm create sveltekit@latest`
2. Set up project structure and CSS variables
3. Create basic TaskCard component
4. Add sample task data
5. Style with modern design system

**Deliverable:** Basic kanban board displaying static tasks

**Commit:** `feat: initial project setup with basic TaskCard component`

### Day 2: Reactivity + Task Management
**Time:** 3 hours

**Tasks:**
1. Implement task creation functionality
2. Add task editing (double-click to edit)
3. Implement task deletion
4. Add reactive task counters
5. Create task priority system

**Key Concepts:**
- Reactive statements (`$:`)
- Array mutations
- State management patterns

**Deliverable:** Interactive task management with live updates

**Commit:** `feat: task CRUD operations with reactive updates`

### Day 3: Events + Enhanced Interaction
**Time:** 3 hours

**Tasks:**
1. Add keyboard shortcuts (Enter to save, Escape to cancel)
2. Implement click-outside editing behavior
3. Add hover effects and smooth animations
4. Create custom event dispatchers for task actions
5. Add task priority visual indicators

**Key Concepts:**
- Event handling patterns
- Custom events
- CSS transitions
- User experience design

**Deliverable:** Polished task interactions with keyboard support

**Commit:** `feat: enhanced task interactions with keyboard support`

### Day 4: Component Architecture + Props
**Time:** 3 hours

**Tasks:**
1. Refactor into modular components (Board, Column, TaskCard)
2. Implement proper prop patterns
3. Create configurable column system
4. Add component documentation
5. Implement prop validation

**Key Concepts:**
- Component composition
- Props best practices
- Reusable component design
- Documentation patterns

**Deliverable:** Clean, modular component architecture

**Commit:** `refactor: modular component architecture with props`

### Day 5: Conditional Logic + Filtering
**Time:** 3 hours

**Tasks:**
1. Add task filtering (All, Active, Completed)
2. Implement search functionality
3. Create empty state UI
4. Add conditional styling based on task properties
5. Implement task statistics

**Key Concepts:**
- Conditional rendering
- Array filtering
- Search algorithms
- State-driven UI

**Deliverable:** Advanced filtering and search capabilities

**Commit:** `feat: filtering and search with conditional rendering`

### Day 6: Forms + Data Binding
**Time:** 3 hours

**Tasks:**
1. Create comprehensive task creation form
2. Add due date picker
3. Implement priority selection
4. Add form validation
5. Create task templates

**Key Concepts:**
- Two-way data binding
- Form validation patterns
- Input component patterns
- User input handling

**Deliverable:** Professional task creation experience

**Commit:** `feat: comprehensive task form with validation`

### Day 7: Drag & Drop + Persistence
**Time:** 4 hours

**Tasks:**
1. Install and implement `svelte-dnd-action`
2. Add smooth drag & drop animations
3. Implement local storage persistence
4. Add data export/import functionality
5. Polish UI and add loading states
6. Record demo video

**Key Concepts:**
- Third-party library integration
- Local storage patterns
- Animation timing
- Data persistence

**Deliverable:** Full-featured kanban board with persistence

**Commit:** `feat: drag & drop kanban with local storage persistence`

## 🎨 Design Guidelines

### Color System
Use CSS variables for consistent theming:
```css
--primary-color: #3b82f6;
--success-color: #10b981;
--warning-color: #f59e0b;
--danger-color: #ef4444;
```

### Component Structure
Follow this pattern for all components:
```svelte
<script>
  // Props
  // Local state
  // Functions
  // Reactive statements
</script>

<!-- Markup -->

<style>
  /* Component styles */
</style>
```

### Accessibility
- Use semantic HTML elements
- Add proper ARIA labels
- Ensure keyboard navigation works
- Maintain proper focus management

## 🧪 Testing Your Understanding

After each day, ask yourself:
1. Can I explain this concept to someone else?
2. Can I implement this without looking at examples?
3. Do I understand when and why to use this pattern?

## 🎯 Week 1 Success Criteria

By the end of Week 1, you should be able to:
- [ ] Create and structure Svelte components
- [ ] Handle user interactions and events
- [ ] Manage local component state
- [ ] Implement conditional rendering and loops
- [ ] Use props to pass data between components
- [ ] Build a complete interactive application

## 🎬 Demo Requirements

Create a 2-3 minute video showing:
1. Adding a new task
2. Editing a task by double-clicking
3. Dragging tasks between columns
4. Filtering/searching tasks
5. Data persisting after page refresh

## 🐛 Common Pitfalls

### Reactivity Issues
```svelte
<!-- ❌ Wrong: Direct mutation -->
tasks.push(newTask);

<!-- ✅ Correct: Assignment to trigger reactivity -->
tasks = [...tasks, newTask];
```

### Event Handling
```svelte
<!-- ❌ Wrong: Calling function immediately -->
<button on:click={handleClick()}>

<!-- ✅ Correct: Passing function reference -->
<button on:click={handleClick}>
```

### Component Communication
```svelte
<!-- ❌ Wrong: Trying to mutate props -->
<script>
  export let task;
  task.title = 'New title'; // Don't do this
</script>

<!-- ✅ Correct: Using events -->
<script>
  import { createEventDispatcher } from 'svelte';
  export let task;
  
  const dispatch = createEventDispatcher();
  
  function updateTask() {
    dispatch('update', { id: task.id, title: 'New title' });
  }
</script>
```

## 📚 Additional Resources

### Must-Read Articles
- [Svelte Tutorial](https://learn.svelte.dev/)
- [Svelte Documentation](https://svelte.dev/docs)
- [Thinking in Svelte](https://svelte.dev/blog/thinking-in-svelte)

### Video Resources
- [Rich Harris - Rethinking Reactivity](https://www.youtube.com/watch?v=AdNJ3fydeao)
- [Svelte Mastery Course](https://www.youtube.com/playlist?list=PLoKaNN3BjQX3fG-XOSwsPHtnV8FUY6lgK)

### Community
- [Svelte Discord](https://discord.gg/svelte)
- [Svelte Reddit](https://reddit.com/r/sveltejs)
- [Svelte Society](https://sveltesociety.dev/)

## 🎉 Week 1 Completion

Once you've completed all tasks and can demonstrate the success criteria, you're ready for Week 2!

**Next:** Week 2 focuses on Svelte stores, component lifecycle, and adding user authentication to your kanban board.

---

**Questions?** Create an issue in this repository or ask in the Svelte Discord!

**Stuck?** Remember: the goal is learning, not just completion. Take time to understand each concept before moving on.