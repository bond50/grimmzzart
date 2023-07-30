import React from 'react';
import Card from "../card/CardWithFilters";
import { Icon } from '@iconify/react';
const RecentActivity = () => {
    const filterOptions = ['Today', 'This Month', 'This Year'];
    const activityData = [
        {
            time: '32 min',
            status: 'success',
            content: 'Quia quae rerum',
            link: 'explicabo officiis',
            linkContent: 'beatae'
        },
        {time: '56 min', status: 'danger', content: 'Voluptatem blanditiis blanditiis eveniet'},
        {time: '2 hrs', status: 'primary', content: 'Voluptates corrupti molestias voluptatem'},
        {
            time: '1 day',
            status: 'info',
            content: 'Tempore autem saepe',
            link: 'occaecati voluptatem',
            linkContent: 'tempore'
        },
        {time: '2 days', status: 'warning', content: 'Est sit eum reiciendis exercitationem'},
        {time: '4 weeks', status: 'muted', content: 'Dicta dolorem harum nulla eius. Ut quidem quidem sit quas'},
    ];

    return (
        <Card cardTitle="Recent Activity" filterOptions={filterOptions}>
            <div className="activity">
                To do: Use of Docker,Redis and sockets to achieve this
                {/*{activityData.map((activity, index) => (*/}
                {/*    <div className="activity-item d-flex" key={index}>*/}
                {/*        <div className="activite-label">{activity.time}</div>*/}
                {/*        <Icon icon="bi:circle-fill"  className={`activity-badge text-${activity.status} align-self-start`}/>*/}
                {/*        <div className="activity-content">*/}
                {/*            {activity.content}*/}
                {/*            {activity.link &&*/}
                {/*            <a href="#" className="fw-bold text-dark"> {activity.linkContent}</a>*/}
                {/*            }*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*))}*/}
            </div>
        </Card>
    )
};

export default RecentActivity;
