import {check} from 'meteor/check';
import { TeamsCollection } from './TeamsCollection';
import { useTracker } from 'meteor/react-meteor-data';

Meteor.methods({
    'teams.insert'(teamName, teamMembers) {
        check(teamName, String);
        check(teamMembers, [String]);
        const user = useTracker(() => Meteor.user());

        if(!this.userId){
            throw new Meteor.Error('Not authorized');
        }

        TeamsCollection.insert({
            teamName: teamName,
            createdAt: new Date,
            userId: this.userId,
            owner: user.username,
            members: teamMembers,
            personal: false,
            projects: []
        })
    },

    'teams.insertPersonal'(teamName, teamMembers) {
        check(teamName, String);
        check(teamMembers, [String]);
        const user = useTracker(() => Meteor.user());

        if(!this.userId){
            throw new Meteor.Error('Not authorized');
        }

        TeamsCollection.insert({
            teamName: teamName,
            createdAt: new Date,
            userId: this.userId,
            owner: teamMembers[0],
            members: teamMembers,
            personal: true,
            projects: []
        })
    },

    'teams.editTeam'(teamId, teamName, teamMembers){
        check(teamName, String);
        check(teamMembers, [String]);
        const user = useTracker(() => Meteor.user());

        if(!this.userId){
            throw new Meteor.Error('Not authorized');
        }

        TeamsCollection.update(
            teamId, {
                $set : {
                    teamName: teamName,
                    members: teamMembers
                }
            }
        )
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