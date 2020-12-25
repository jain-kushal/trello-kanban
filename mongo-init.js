db.createUser({
  user: 'kanbanTrello',
  pwd: 'kanbanTrello',
  roles: [
    {
      role: 'readWrite',
      db: 'kanbanTrelloDB',
    },
  ],
});
