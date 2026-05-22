const Program = require('../models/Program');

const getPrograms = async (req, res) => {
  try {
    const programs = await Program.find({ active: true }).sort({ order: 1, title: 1 });
    res.json(programs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getProgramById = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (program) {
      res.json(program);
    } else {
      res.status(404).json({ message: 'Program not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createProgram = async (req, res) => {
  try {
    const program = new Program(req.body);
    const createdProgram = await program.save();
    res.status(201).json(createdProgram);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateProgram = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (program) {
      Object.assign(program, req.body);
      const updatedProgram = await program.save();
      res.json(updatedProgram);
    } else {
      res.status(404).json({ message: 'Program not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteProgram = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (program) {
      await program.deleteOne();
      res.json({ message: 'Program removed' });
    } else {
      res.status(404).json({ message: 'Program not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getPrograms,
  getProgramById,
  createProgram,
  updateProgram,
  deleteProgram
};