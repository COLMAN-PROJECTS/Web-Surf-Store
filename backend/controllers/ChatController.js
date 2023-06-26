const sanitizedMessage = require('xss');
function handleBotResponse(message) {
    const lowercaseMessage = message.toLowerCase();

    if (lowercaseMessage.includes('hello' || 'hey' || 'hi')) {
        return 'Hello there! How can I help you today?';
    }
    else if (lowercaseMessage.includes('hours')) {
        return 'Our store is open from 9 AM to 6 PM, Sunday to Friday.';
    } else if (lowercaseMessage.includes('location')) {
        return 'Our surf store is located at 123 Surf Avenue, Tel Aviv.';
    } else if (lowercaseMessage.includes('product' || 'products' || 'items' || 'stock' || 'available')) {
        return 'We have a wide range of surfboards, wetsuits, and accessories in stock.\nIs there a specific product you are interested in?';
    } else if (lowercaseMessage.includes('surfboard' || 'surfboards')) {
        return 'We have a wide range of surfboards in stock.\n you can check out our website for more details.';
    } else if (lowercaseMessage.includes('wetsuit' || 'wetsuits')) {
        return 'We have a wide range of wetsuits in stock.\n you can check out our website for more details.';
    } else if (lowercaseMessage.includes('accessory' || 'accessories')) {
        return 'We have a wide range of accessories in stock.\n you can check out our website for more details.';
    } else if (lowercaseMessage.includes('price')) {
        return 'Our prices range from $100 to $2000, depending on the product.\nIs there a specific product you are interested in?';
    } else if (lowercaseMessage.includes('shipping')) {
        return 'We offer free shipping on all orders above $50. Shipping usually takes 3-5 business days.';
    } else if (lowercaseMessage.includes('returns')) {
        return 'We have a flexible return policy.\nYou can return any unused items within 30 days of purchase for a full refund.';
    } else if (lowercaseMessage.includes('sales')) {
        return 'We have ongoing sales and promotions on select surfboards and accessories.\nVisit our website or store to check out the latest deals!';
    } else if (lowercaseMessage.includes('surf lessons')) {
        return 'Yes, we offer surf lessons for all skill levels.\nOur experienced instructors will help you improve your surfing skills. Please contact us ny phone or mail to book a lesson.';
    } else if (lowercaseMessage.includes('contact')) {
        return 'You can reach our customer support team at support@surfStore.com or call us at +972-54673225.';
    } else {
        return "I'm sorry, I couldn't understand your question, I'm a new Bot \uD83D\uDE42 \n Please try again. ";
    }
}


const handleChat = (io) => {

    io.on('connection', (socket) => {
        console.log('New connection');

        const welcomeMessage = 'Welcome to our surf store! How can we assist you today?';
        socket.emit('message', welcomeMessage);

        socket.on('message', (data) => {
            console.log('Received message:', data);

            const sanitizedData = sanitizedMessage.escapeHtml(data);

            const botResponse = handleBotResponse(sanitizedData);
            socket.emit('message', botResponse);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
}


module.exports = {
    handleChat
};
