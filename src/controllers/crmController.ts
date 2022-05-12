import * as mongoose from 'mongoose';
import { ContactSchema } from '../models/crmModel';

const Contact = mongoose.model('Contact', ContactSchema);

export const addNewContact = async (req, res) => {
  console.log(req.body);

  let newContact = await new Contact(req.body);

  newContact.save((err, contact) => {
    if (err) {
      res.send(err);
    }
    res.json(contact);
  });
};

export const getContacts = (req, res) => {
  Contact.find({}, (err, contact) => {
    if (err) {
      res.send(err);
    }
    res.json(contact);
    // get actual data
    for (let item of contact) {
      console.log(item);
    }
    // index of data
    for (let dataIdx in contact) {
      console.log(dataIdx);

    }
  });
};

export const getContactWithID = (req, res) => {
  Contact.findById(req.params.contactId, (err, contact) => {
    if (err) {
      res.send(err);
    }
    res.json(contact);
  });
}

export const updateContact = (req, res) => {
  Contact.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true }, (err, contact) => {
    if (err) {
      res.send(err);
    }
    res.json(contact);
  })
}

export const deleteContact = (req, res) => {
  Contact.remove({ _id: req.params.contactId }, (err, contact) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'Successfully deleted contact' });
  })
}