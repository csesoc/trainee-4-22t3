import { Request, Response } from 'express';
import Music from '../models/musicModel';
import User from '../models/userModel';
import { fetchUserByToken } from './userController';

// userSchema.add({education: String, age: Number, profile_pic: String});

const addItem = async (req: Request, res: Response) => {
  fetchUserByToken(req)
    .then(async (user: any) => {
      const { name, comment, artist, producer, imageUrl, rating } = req.body;
      const music = await Music.create({
        uId: user._id,
        category: 'Music',
        name,
        comment,
        rating,
        artist,
        producer,
        imageUrl,
      });
      if (music) {
        res.status(200).json({
          musicId: music._id,
          category: music.category,
          name: music.name,
          comment: music.comment,
          artist: music.artist,
          producer: music.producer,
          imageUrl: music.imageUrl,
        });
      } else {
        res.status(400).json({ error: 'sussy error occured' });
      }
    })
    .catch((err) => res.status(400).json(err));
};

const deleteItem = (req: Request, res: Response) => {
  fetchUserByToken(req)
    .then(async (user: any) => {
      const musicId = req.params.id;
      const music = await Music.findById(musicId);
      if (music && music.uId === user._id.toString()) {
        const deleted = await Music.deleteOne({ _id: musicId });
        deleted
          ? res.status(200).json({})
          : res.status(400).json({ error: 'sus' });
      } else {
        res.status(400).json({ error: 'musicId not found' });
      }
    })
    .catch((err) => res.status(400).json(err));
};

const updateItem = async (req: Request, res: Response) => {
  fetchUserByToken(req)
    .then(async (user: any) => {
      const musicId = req.params.id;
      const music = await Music.findById(musicId);
      if (music && music.uId === user._id.toString()) {
        const music = await Music.findByIdAndUpdate(musicId, req.body, {
          new: true,
        });
        music
          ? res.status(200).json({})
          : res.status(400).json({ error: 'sus' });
      } else {
        res.status(400).json({ error: 'musicId not found' });
      }
    })
    .catch((err) => res.status(400).json(err));
};

const getItems = async (req: Request, res: Response) => {
  fetchUserByToken(req)
    .then(async (user: any) => {
      const allItems = await Music.find({ uId: user._id });
      if (allItems) {
        res.status(200).json(allItems);
      } else {
        res.status(400).json({ error: 'bruh' });
      }
    })
    .catch((err) => res.status(400).json(err));
};

export { addItem, updateItem, deleteItem, getItems };
