import { expect } from '@esm-bundle/chai';
import './lineup-card.js';

function getFormattedTitle(name, social) {
  return `${name}'s ${social.charAt(0).toUpperCase()}${social.slice(1)} page`;
}

describe('Components/Lineup Card', () => {
  const MOCK_ARTIST = {
    isHeadliner: true,
    name: 'Jabbawaukee',
    bio: 'Jabbawaukee is a Southern New England based quartet playing psychedelic funk and jam rock!',
    picture: '/assets/images/lineup/jabbawaukee.webp',
    facebook: 'https://www.facebook.com/JABBAWAUKEE/',
    instagram: 'https://www.instagram.com/jabbawaukee_band/',
    website: 'https://www.jabbawaukee.com',
    spotify: 'https://open.spotify.com/artist/1CBlzYSiHvEO86x2UO85u4',
    youtube: 'https://www.youtube.com/channel/UCjNsiyNaoh7-Xp6rtCgq4BA',
    apple: 'https://music.apple.com/us/artist/jabbawaukee/1593104536',
    startTime: 1690683300000 // 10:15pm
  };
  let card;

  describe('Default Behavior', () => {
    before(async () => {
      card = document.createElement('bf-lineup-card');
      card.setAttribute('name', MOCK_ARTIST.name);
      card.setAttribute('bio', MOCK_ARTIST.bio);
      card.setAttribute('picture', MOCK_ARTIST.picture);

      document.body.appendChild(card);

      await card.updateComplete;
    });

    it('should not be null', () => {
      expect(card).not.equal(undefined);
      expect(card.querySelectorAll('article').length).equal(1);
    });

    it('should display the name attribute value in the card', () => {
      const heading = document.querySelectorAll('h2');

      expect(heading.length).to.equal(1);
      expect(heading[0].textContent).to.equal(MOCK_ARTIST.name);
    });

    it('should display the bio attribute value in the card', () => {
      const paragraph = document.querySelectorAll('p');

      expect(paragraph.length).to.equal(1);
      expect(paragraph[0].textContent).to.equal(MOCK_ARTIST.bio);
    });

    it('should display the picture attribute value in the card', () => {
      const img = document.querySelectorAll('picture img');

      expect(img.length).to.equal(1);
      expect(img[0].getAttribute('src')).to.equal(MOCK_ARTIST.picture);
      expect(img[0].getAttribute('alt')).to.equal(`Picture of ${MOCK_ARTIST.name}`);
    });

    it('the image should not be rotated', () => {
      const container = document.querySelectorAll('div.rotate-0');
      const containsImage = container[0].querySelectorAll('picture img').length === 1;

      expect(container.length).to.equal(1);
      expect(containsImage).to.equal(true);
    });

    it('should not display a list of social icons', () => {
      const list = document.querySelectorAll('ul');

      expect(list.length).to.equal(0);
    });

    after(() => {
      card.remove();
      card = null;
    });
  });

  describe('Social Links Behavior', () => {
    const SOCIALS = ['youtube', 'spotify', 'website', 'apple', 'instagram', 'facebook'];

    before(async () => {
      card = document.createElement('bf-lineup-card');
      card.setAttribute('name', MOCK_ARTIST.name);
      card.setAttribute('bio', MOCK_ARTIST.bio);
      card.setAttribute('picture', MOCK_ARTIST.picture);

      SOCIALS.forEach(social => {
        card.setAttribute(social, MOCK_ARTIST[social]);
      });

      document.body.appendChild(card);

      await card.updateComplete;
    });

    describe('default attributes', () => {
      it('should display the default name attribute value in the card', () => {
        const heading = document.querySelectorAll('h2');

        expect(heading.length).to.equal(1);
        expect(heading[0].textContent).to.equal(MOCK_ARTIST.name);
      });

      it('should display the bio attribute value in the card', () => {
        const paragraph = document.querySelectorAll('p');

        expect(paragraph.length).to.equal(1);
        expect(paragraph[0].textContent).to.equal(MOCK_ARTIST.bio);
      });

      it('should display the picture attribute value in the card', () => {
        const img = document.querySelectorAll('picture img');

        expect(img.length).to.equal(1);
        expect(img[0].getAttribute('src')).to.equal(MOCK_ARTIST.picture);
        expect(img[0].getAttribute('alt')).to.equal(`Picture of ${MOCK_ARTIST.name}`);
      });

      it('the image should not be rotated', () => {
        const container = document.querySelectorAll('div.rotate-0');
        const containsImage = container[0].querySelectorAll('picture img').length === 1;

        expect(container.length).to.equal(1);
        expect(containsImage).to.equal(true);
      });
    });

    describe('social links', () => {
      it('should display three social link items', () => {
        const items = document.querySelectorAll('ul li');

        expect(items.length).to.equal(SOCIALS.length);
      });

      it('should display all the social links', () => {
        SOCIALS.forEach(social => {
          const title = getFormattedTitle(MOCK_ARTIST.name, social);
          const link = document.querySelectorAll(`ul li a[title="${title}"]`);
          const icon = document.querySelectorAll(`ul li a img[alt="${title}"`);

          expect(link.length).to.equal(1);
          expect(link[0].getAttribute('href')).to.equal(MOCK_ARTIST[social]);

          expect(icon.length).to.equal(1);
          expect(icon[0].getAttribute('src')).to.include(social);
        });
      });
    });

    after(() => {
      card.remove();
      card = null;
    });
  });

  describe('Rotate Right Behavior', () => {
    before(async () => {
      card = document.createElement('bf-lineup-card');
      card.setAttribute('rotation', 'right');

      document.body.appendChild(card);

      await card.updateComplete;
    });

    it('should not be null', () => {
      expect(card).not.equal(undefined);
      expect(card.querySelectorAll('article').length).equal(1);
    });

    it('the image should be rotated to the right', () => {
      const container = document.querySelectorAll('div.rotate-12');
      const containsImage = container[0].querySelectorAll('picture img').length === 1;

      expect(container.length).to.equal(1);
      expect(containsImage).to.equal(true);
    });
  });

  describe('Rotate Left Behavior', () => {
    before(async () => {
      card = document.createElement('bf-lineup-card');
      card.setAttribute('rotation', 'left');

      document.body.appendChild(card);

      await card.updateComplete;
    });

    it('should not be null', () => {
      expect(card).not.equal(undefined);
      expect(card.querySelectorAll('article').length).equal(1);
    });

    it('the image should be rotated to the left', () => {
      const container = document.querySelectorAll('div.-rotate-12');
      const containsImage = container[0].querySelectorAll('picture img').length === 1;

      expect(container.length).to.equal(1);
      expect(containsImage).to.equal(true);
    });
  });

  after(() => {
    card.remove();
    card = null;
  });

});