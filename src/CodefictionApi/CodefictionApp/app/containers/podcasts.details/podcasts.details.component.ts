import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { IPodcast as IPodcasts } from '../../models/Podcasts';
import { PodcastService } from '../../shared/podcasts.service';

@Component({
    selector: 'app-podcasts.details',
    templateUrl: './podcasts.details.component.html',
    styleUrls: ['./podcasts.details.component.css']
})
export class PodcastsDetailsComponent implements OnInit {
    podcast: IPodcasts;

    constructor(
        private sanitizer: DomSanitizer,
        private route: ActivatedRoute,
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: Object,
        private podcastService: PodcastService) {

    }

    ngOnInit() {
        let slug = this.route.snapshot.paramMap.get('slug');

        this.podcastService.getPodcastbySlug(slug).subscribe(result => {
            this.podcast = result;
        });
    }

    getYoutubeUrl(): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.podcast.youtubeUrl);
    }

    getSoundCloudUrl(): SafeResourceUrl {
        let soundCloudUrl: string = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' +
            this.podcast.soundcloudId + '&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true';

        return this.sanitizer.bypassSecurityTrustResourceUrl(soundCloudUrl);
    }

    gotoPodcasts() {
        this.router.navigate(['/podcasts']);
    }
}