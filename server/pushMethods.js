//Push.debug = true;


Push.allow({
    send: function(userId, notification) {
        return true; // Allow all users to send
    }
});

Meteor.methods({
    serverNotification: function(text,title) {
        var badge = 1
        Push.send({
            from: 'push',
            title: title,
            text: text,
            badge: badge,
            sound: 'airhorn.caf',
            payload: {
                title: title,
                text:text,
                historyId: result
            },
            query: {
                // this will send to all users
            }
        });
    },
    userNotification: function(text,title,userId) {
        var badge = 1
        Push.send({
            from: 'push',
            title: title,
            text: text,
            badge: badge,
            sound: 'airhorn.caf',
            payload: {
                title: title,
                historyId: result
            },
            query: {
                userId: userId //this will send to a specific Meteor.user()._id
            }
        });
    },



    serverNotification1: function () {
        var last = NotificationHistory.findOne({}, {sort: {addedAt: -1}});
        var badge = 1
        if (last != null) {
            badge = last.badge + 1;
        }

        NotificationHistory.insert({
            badge: badge,
            addedAt: new Date()
        }, function (error, result) {
            if (!error) {
                Push.send({
                    from: 'push',
                    title: 'Hello World',
                    text: 'This notification has been sent from the SERVER',
                    badge: badge,
                    payload: {
                        title: 'Hello World',
                        historyId: result
                    },
                    query: {}
                });
            }
        });
    },
    removeHistory: function () {
        NotificationHistory.remove({}, function (error) {
            if (!error) {
                console.log("All history removed");
            }
        });
    }
});