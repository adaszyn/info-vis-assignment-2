import * as React from 'react'
import "./AboutView.css";

export class AboutView extends React.Component<any, any> {
    public render () {
        return (
            <div className="about-view">
                <header className="header">
                    <h2>About project</h2>
                </header>
                Project made during{' '}
                <a className="first after" href="https://www.kth.se/student/kurser/kurs/DH2321?l=en">
                    Information Visualization
                </a> course at <a className="first after"  href="https://www.kth.se/">KTH</a> by Wojciech Adaszyński.
            </div>
        )
    }
}
