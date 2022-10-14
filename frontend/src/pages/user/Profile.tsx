import axios from "axios";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { listActivitiesByUser } from "../../apiClient/activityService";
import { checkRelationExists, follow, unfollow } from "../../apiClient/relationService";
import { getUserProfile } from "../../apiClient/userService";
import Avatar from "../../components/Avatar";
import useAuth from "../../hooks/useAuth";
import { Activity } from "../../interfaces/activity";
import { UserProfileRelations } from "../../interfaces/user";
import formatRelativeDate from "../../utils/formatRelativeDate";

function Profile() {
  const { user } = useAuth();

  let [searchParams] = useSearchParams();
  const userParamsId = Number(searchParams.get("user"));

  const [profile, setProfile] = useState<UserProfileRelations>({
    id: 0,
    fullName: '',
    avatarUrl: '',
    followingNumber: 0,
    followingRelation: [],
    followerNumber: 0,
    followerRelation: [],
  });

  const [activities, setActivities] = useState<Activity[]>([]);

  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  useMemo(() => {
    async function listActivities() {
      try {
        const response = await listActivitiesByUser(userParamsId);
        const activitiesData = response.data;

        for (let item of activitiesData) {
          setActivities(prevState => [
            ...prevState,
            {
              id: item.id,
              userId: item.user,
              userName: item.user_name,
              userAvatarUrl: item.user_avatar_url,
              followingRelationId: item.following_relation,
              followingUserName: item.following_user_name,
              lessonId: item.lesson,
              lessonTitle: item.lesson_title,
              lessonScore: item.lesson_score,
              lessonTotal: item.lesson_total,
              updatedAt: item.updated_at,
            }
          ]);
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.log(`${err.request.status} ${err.request.statusText}`);
        }
      }
    }

    async function getProfile() {
      try {
        const response = await getUserProfile(userParamsId);
        const profileData = response.data;

        setProfile({
          id: profileData.id,
          fullName: profileData.full_name,
          avatarUrl: profileData.avatar_url,
          followingNumber: profileData.following_number,
          followingRelation: [],
          followerNumber: profileData.follower_number,
          followerRelation: [],
        });
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.log(`${err.request.status} ${err.request.statusText}`);
        }
      }
    }

    listActivities();
    getProfile();
  }, [userParamsId]);

  useMemo(() => {
    async function checkFollowing() {
      try {
        const response = await checkRelationExists(user.id, userParamsId);
        const exists = response.data.exists;
        setIsFollowing(exists);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.log(`${err.request.status} ${err.request.statusText}`);
        }
      }
    }
    checkFollowing();
  }, [user.id, userParamsId]);

  async function handleFollow() {
    try {
      const response = await follow(user.id, userParamsId);
      if (response.status === 201) {
        setIsFollowing(true);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(`${err.request.status} ${err.request.statusText}`);
      }
    }
  }

  async function handleUnfollow() {
    try {
      const response = await unfollow(user.id, userParamsId);
      if (response.status === 204) {
        setIsFollowing(false);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(`${err.request.status} ${err.request.statusText}`);
      }
    }
  }


  const renderActivities = activities && (
    activities.map(({
      id,
      userName,
      userAvatarUrl,
      followingRelationId,
      followingUserName,
      lessonId,
      lessonTitle,
      lessonScore,
      lessonTotal,
      updatedAt
    }) => (
      <div key={id} className="activity-container">
        <Avatar className="sm-avatar" avatarUrl={userAvatarUrl} />
        <div>
          {
            followingRelationId &&
            <p className="activity-detail">
              <strong>{userName}</strong> followed <strong>{followingUserName}</strong>
            </p>
          }
          {
            lessonId &&
            <p className="activity-detail">
              <strong>{userName}</strong> learned {lessonScore} of {lessonTotal} words in <strong>{lessonTitle}</strong>
            </p>
          }
          <p className="caption">
            {formatRelativeDate(updatedAt)}
          </p>
        </div>
      </div>
    ))
  );

  const renderButton = user.id !== userParamsId && (
    isFollowing ? (
      <button
        className="btn btn-sm btn-primary"
        onClick={handleUnfollow}
      >
        Unfollow
      </button>
    ) : (
      <button
        className="btn btn-sm btn-primary"
        onClick={handleFollow}
      >
        Follow
      </button>
    )
  );

  return (
    <div className="sm-container d-flex flex-column pt-5">
      <div className="d-flex align-items-start m-auto gap-5">
        <Avatar avatarUrl={profile.avatarUrl} className="sm-avatar" />
        <div className="d-flex flex-column">
          <h4>{profile.fullName}</h4>
          <div className="d-flex gap-2">
            <span>{profile.followerNumber} {profile.followerNumber > 1 ? 'followers' : 'follower'}</span>
            <span>•</span>
            <span>{profile.followingNumber} following</span>
          </div>
        </div>
        {renderButton}
      </div>

      <hr />

      <div className="flex-fill mt-3">
        <h2>Activities</h2>
        {renderActivities}
      </div>
    </div>
  );
}

export default Profile;
