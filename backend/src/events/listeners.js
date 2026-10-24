import taskEvents from './events.js';

// Practical 10: Asynchronous Event Listeners decoupled from HTTP response cycle
taskEvents.on('task-created', (taskData) => {
  const timestamp = new Date().toISOString();
  console.log(`[EVENT: task-created] Handler STARTED at: ${timestamp}`);
  console.log(`  -> Task Title: "${taskData.title}"`);
  console.log(`  -> Owner: events_user_24cs104@charusat.edu.in`);
  console.log(`  -> Asynchronous 2000ms simulation timer initiated without blocking client...`);

  setTimeout(() => {
    console.log(`[EVENT: task-created] Notification Processed at: ${new Date().toISOString()}`);
    console.log(`  -> Status: Background Webhook & Email Dispatched`);
    console.log(`  -> Finished exactly 2000ms AFTER HTTP response was delivered!`);
  }, 2000);
});

taskEvents.on('task-deleted', (taskId) => {
  console.log(`[EVENT: task-deleted] Task ID ${taskId} cleanup dispatched asynchronously.`);
});

export default taskEvents;
