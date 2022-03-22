import {check} from 'meteor/check';
import { TeamsCollection } from './TeamsCollection';

Meteor.methods({
    'teams.insert'(teamName, teamMembers) {
        check(teamName, String);
        check(teamMembers, [String]);

        if(!this.userId){
            throw new Meteor.Error('Not authorized');
        }

        TeamsCollection.insert({
            teamName: teamName,
            createdAt: new Date,
            userId: this.userId,
            owner: this.user.username,
            members: teamMembers,
            projects: []
        })
    },

    'teams.remove'(teamId) {
        if(!this.userId){
            throw new Meteor.Error('Not authorized');
        }

        TeamsCollection.remove(teamId);
    },

    'teams.addMember'(teamId, memberName){
        check(teamId, String);
        check(memberName, String);

        if(!this.userId){
            throw new Meteor.Error('Not authorized');
        }

        TeamsCollection.update(teamId, {
            $push: {
                members: memberName
            }
        })
    },

    'teams.removeMember'(teamId, memberName){
        check(teamId, String);
        check(memberName, String);

        if(!this.userId){
            throw new Meteor.Error('Not authorized');
        }

        TeamsCollection.update(teamId, {
            $pull: {
                members: memberName
            }
        })
    },
});