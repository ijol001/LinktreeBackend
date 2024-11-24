const Link = require('../models/Links');

const getLinks = async (req, res) => {
    try {
        const links = await Link.find({ userId: req.user.id });
        res.json(links);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const createLink = async (req, res) => {
    const { title, url } = req.body;

    try {
        const link = new Link({ userId: req.user.id, title, url });
        await link.save();
        res.status(201).json(link);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const updateLink = async(req, res) =>{
    try{
        const {title, url} = req.body;
        const link = await Link.findByIdAndUpdate( req.params.id,
            { title, url },
            { new: true });
        if (!link) {
            return res.status(404).json({ message: 'Link not found' });
        }
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "At least one field is required to update." });
        }
        link.title = title || link.title;
            link.url = url || link.url;

            const updatedLink = await link.save();
            res.json(updatedLink);
    }
    catch (error) {
        console.error('Error updating data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteLink = async (req, res) => {
    try {
        const link = await Link.findByIdAndDelete(req.params.id);
        if (!link) {
            return res.status(404).json({ message: 'Link not found' });
        }
        res.status(200).json({ message: 'Link deleted successfully' });
    } catch (error) {
        console.error('Error deleting link:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { getLinks, createLink, updateLink, deleteLink };
