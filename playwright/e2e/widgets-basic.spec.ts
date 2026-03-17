import { expect, test } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage';

test.describe('Landing page widgets - basic presence and links', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 2000 });
    const landing = new LandingPage(page);
    await landing.gotoAndWaitForLayout();
    await landing.resetToDefaultLayout();
  });

  test('RHEL widget exists', async ({ page }) => {
    const landing = new LandingPage(page);
    await expect(landing.widget('rhel-widget')).toBeVisible();
  });

  test('RHEL widget link targets Insights', async ({ page }) => {
    const landing = new LandingPage(page);
    await expect(landing.widget('rhel-widget').locator('a')).toHaveAttribute(
      'href',
      /\/insights\//,
    );
  });

  test('RHEL widget can be removed', async ({ page }) => {
    const landing = new LandingPage(page);
    await landing.removeWidget('rhel-widget');
  });

  test('Ansible widget appears in default layout', async ({ page }) => {
    const landing = new LandingPage(page);
    await expect(landing.widget('ansible-widget')).toBeVisible();
  });

  test('Ansible widget has correct link', async ({ page }) => {
    const landing = new LandingPage(page);
    await expect(landing.widget('ansible-widget').locator('a')).toHaveAttribute(
      'href',
      /\/ansible\/ansible-dashboard/,
    );
  });

  test('Ansible widget can be removed', async ({ page }) => {
    const landing = new LandingPage(page);
    await landing.removeWidget('ansible-widget');
    // cleanup: restore default layout for any following tests in the same worker run
    await landing.resetToDefaultLayout();
  });

  test('OpenShift widget exists and links to /openshift', async ({ page }) => {
    const landing = new LandingPage(page);
    const widgetId = 'openshift-widget';
    await expect(landing.widget(widgetId)).toBeVisible();
    await expect(landing.widget(widgetId).locator('a')).toHaveAttribute('href', /\/openshift/);
  });

  test('OpenShift widget can be removed', async ({ page }) => {
    const landing = new LandingPage(page);
    await landing.removeWidget('openshift-widget');
  });

  test('OpenShift AI widget exists', async ({ page }) => {
    const landing = new LandingPage(page);
    await expect(landing.widget('openshiftAi-widget')).toBeVisible();
  });

  test('OpenShift AI widget link is correct', async ({ page }) => {
    const landing = new LandingPage(page);
    await expect(landing.widget('openshiftAi-widget').locator('a')).toHaveAttribute(
      'href',
      /redhat\.com\/en\/technologies\/cloud-computing\/openshift\/openshift-ai\/trial/,
    );
  });

  test('OpenShift AI widget can be removed', async ({ page }) => {
    const landing = new LandingPage(page);
    await landing.removeWidget('openshiftAi-widget');
  });

  test('ACS widget shows expected descriptive copy', async ({ page }) => {
    const landing = new LandingPage(page);
    // The Cypress source was a component test; here we validate the same copy via E2E widget.
    await expect(landing.widget('acs-widget')).toContainText(
      'Fully hosted software as a service for protecting cloud-native applications and Kubernetes.',
    );
  });
});


