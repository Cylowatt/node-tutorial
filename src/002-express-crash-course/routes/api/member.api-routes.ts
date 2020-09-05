import express from 'express';

import { Member, members, MemberStatus } from '../../members';

const router = express.Router();

/**
 * Returns all members.
 */
router.get('/', (req, res) => res.json(members));

/**
 * Returns member by ID.
 */
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  const member = members.find(m => m.id === id);

  return member ? res.json(member) : res.status(404).end();
});

/**
 * Creates a member.
 */
router.post('/', (req, res) => {
  const body = req.body;

  const newMember: Member = {
    id: members.length + 1,
    name: body.name,
    email: body.email,
    status: MemberStatus.active
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ error: 'name and email must both be present' });
  }

  members.push(newMember);

  res.status(201).json(newMember);
});

/**
 * Updates a member.
 */
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  const member = members.find(m => m.id === id);
  if (!member) {
    return res.status(404).end();
  }

  const body = req.body;

  if (!body.name && !body.email) {
    return res.status(400).json({ error: 'name or email must both be present' });
  }

  member.name = body.name || member.name;
  member.email = body.email || member.email;

  res.json(member);
});

/**
 * Deletes a member.
 */
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  const memberIndex = members.findIndex(m => m.id === id);
  if (memberIndex < 0) {
    return res.status(404).end();
  }

  const member = members.splice(memberIndex, 1)[0];

  res.json(member);
});

export const memberRouter = router;
